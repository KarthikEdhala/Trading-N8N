import { Handle, Position } from "@xyflow/react";

export type TimerNodeMetadata = {
  time: number;
};
export const Timer = ({
  data,
}: {
  data: {
    metadata: TimerNodeMetadata;
  };
  isConnectable: boolean;
}) => {
  return (
    <div className="p-4 border">
      Run Every {data.metadata.time / 3600} seconds
      <Handle type="source" position={Position.Right}></Handle>
    </div>
  );
};
