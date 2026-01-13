import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { TriggerSheet } from "./TriggerSheet";
import { Timer } from "../nodes/triggers/Timer";
import { PriceTrigger } from "../nodes/triggers/PriceTrigger";

export type NodeKind =
  | "price-trigger"
  | "timer"
  | "hyperlink"
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

export type NodeMetadata = any;

interface Edge {
  id: string;
  source: string;
  target: string;
}

export default function CreateWorkflow() {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

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
    console.log(connectionInfo);
    console.log(params);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {JSON.stringify(nodes)}
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
