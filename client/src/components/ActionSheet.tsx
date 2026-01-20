import type { NodeKind, NodeMetadata } from "./CreateWorkflow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { TradingMetadata } from "@/nodes/actions/Lighter";
import { SUPPORTED_ASSETS } from "./TriggerSheet";

const SUPPORTED_ACTIONS = [
  {
    id: "hyperliquid",
    title: "Hyperliquid",
    description: "Place a trade on Hyperliquid",
  },
  {
    id: "backpack",
    title: "Backpack",
    description: "Place a trade on Backpack",
  },
  {
    id: "lighter",
    title: "Lighter",
    description: "Place a trade on Lighter",
  },
];

export const ActionSheet = ({
  onSelect,
}: {
  onSelect: (type: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [selectedAction, setselectedAction] = useState(SUPPORTED_ACTIONS[0].id);
  const [metadata, setMetadata] = useState<TradingMetadata | {}>({});
  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger that you need
          </SheetDescription>
          <Select
            value={selectedAction}
            onValueChange={(value) => setselectedAction(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an Action" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_ACTIONS.map((action) => (
                  <SelectItem key={action.id} value={action.id}>
                    {action.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {(selectedAction === "hyperliquid" ||
            selectedAction === "lighter" ||
            selectedAction === "backpack") && (
            <div>
              <div className="pt-4">
                Type
                <div>
                  <Select
                    value={metadata?.type}
                    onValueChange={(value) =>
                      setMetadata((m) => ({ ...m, type: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem key={"long"} value={"long"}>
                          LONG
                        </SelectItem>
                        <SelectItem key={"short"} value={"short"}>
                          SHORT
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="pt-4">
                Quantity
                <Input
                  type="number"
                  value={metadata?.quantity}
                  onChange={(e) =>
                    setMetadata((m) => ({
                      ...m,
                      quantity: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="pt-4">
                Asset
                <div>
                  <Select
                    value={metadata?.asset}
                    onValueChange={(value) =>
                      setMetadata((m) => ({ ...m, asset: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {SUPPORTED_ASSETS.map((asset) => (
                          <SelectItem key={asset} value={asset}>
                            {asset}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </SheetHeader>
        <SheetFooter>
          <Button
            onClick={() => onSelect(selectedAction, metadata)}
            type="submit"
            className="cursor-pointer"
          >
            Create Action
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
