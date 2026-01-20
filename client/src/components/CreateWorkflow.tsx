import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TriggerSheet } from "./TriggerSheet";
import { Timer, type TimerNodeMetadata } from "../nodes/triggers/Timer";
import {
  PriceTrigger,
  type PriceTriggerNodeMetadata,
} from "../nodes/triggers/PriceTrigger";
import type { TradingMetadata } from "@/nodes/actions/Lighter";
import { ActionSheet } from "./ActionSheet";

export type NodeKind =
  | "price-trigger"
  | "timer"
  | "hyperliquid"
  | "backpack"
  | "lighter";

interface NodeType {
  type: NodeKind;
  data: {
    kind: "action" | "trigger";
    metadata: NodeMetadata;
  };
  id: string;
  position: { x: number; y: number };
}
const nodeTypes = {
  "price-trigger": PriceTrigger,
  timer: Timer,
};

export type NodeMetadata =
  | TradingMetadata
  | TimerNodeMetadata
  | PriceTriggerNodeMetadata;

interface Edge {
  id: string;
  source: string;
  target: string;
}

export default function CreateWorkflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectAction, setSelectAction] = useState<{
    position: {
      x: number;
      y: number;
    };
    startingNodeId: string;
  } | null>(null);

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: any) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  const onConnectEnd = useCallback((params, connectionInfo) => {
    if (!connectionInfo.isValid) {
      setSelectAction({
        position: connectionInfo.to,
        startingNodeId: connectionInfo.from,
      });
      console.log(connectionInfo.from);
      console.log(connectionInfo.to);
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {!nodes.length && (
        <TriggerSheet
          onSelect={(type, metadata) => {
            setNodes([
              ...nodes,
              {
                type,
                id: Math.random().toString(),
                position: { x: 0, y: 0 },
                data: {
                  kind: "trigger",
                  metadata,
                },
              },
            ]);
          }}
        />
      )}
      {selectAction && (
        <ActionSheet
          onSelect={(type, metadata) => {
            const NodeId = Math.random().toString();
            setNodes([
              ...nodes,
              {
                type,
                id: NodeId,
                position: selectAction.position,
                data: {
                  kind: "action",
                  metadata,
                },
              },
            ]);
            setEdges([
              ...edges,
              {
                source: selectAction.startingNodeId,
                target: NodeId,
                id: `{selectAction.startingNodeId}-${NodeId}`,
              },
            ]);
          }}
        />
      )}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnectEnd={onConnectEnd}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}
