import type { SUPPORTED_ASSETS } from "@/components/TriggerSheet";

export type TradingMetadata = {
  type: "LONG|SHORT";
  quantity: number;
  asset: typeof SUPPORTED_ASSETS;
};
export function Lighter({ data }: { data: { metadata: TradingMetadata } }) {
  return (
    <div className="p-4 border">
      Lighter Trade
      <div>{data.metadata.type}</div>
      <div>{data.metadata.quantity}</div>
      <div>{data.metadata.asset}</div>
    </div>
  );
}
