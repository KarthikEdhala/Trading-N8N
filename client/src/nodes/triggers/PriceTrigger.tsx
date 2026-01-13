import { Handle, Position } from "@xyflow/react";

export type PriceTriggerNodeMetadata = {
  asset: string;
  price: number;
};
export const PriceTrigger = ({
  data,
}: {
  data: {
    metadata: PriceTriggerNodeMetadata;
  };
  isConnectable: boolean;
}) => {
  return (
    <div className="p-4 border">
      {data.metadata.asset}
      {data.metadata.price}
      <Handle type="source" position={Position.Right}></Handle>
    </div>
  );
};
