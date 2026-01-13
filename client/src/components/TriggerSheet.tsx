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
import type { TimerNodeMetadata } from "@/nodes/triggers/Timer";
import type { PriceTriggerNodeMetadata } from "@/nodes/triggers/PriceTrigger";

const SUPPORTED_TRIGGERS = [
  {
    id: "timer",
    title: "Timer",
    description: "Run this trigger every x seconds/minutes",
  },
  {
    id: "price-trigger",
    title: "Price Trigger",
    description: "Run this trigger when a price condition is met",
  },
];

const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH"];

export const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (type: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [selectedTrigger, setSelectedTrigger] = useState(
    SUPPORTED_TRIGGERS[0].id
  );
  const [metadata, setMetadata] = useState<
    TimerNodeMetadata | PriceTriggerNodeMetadata
  >({ time: 10000 });
  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger that you need
          </SheetDescription>
          <Select
            value={selectedTrigger}
            onValueChange={(value) => setSelectedTrigger(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_TRIGGERS.map((trigger) => (
                  <SelectItem key={trigger.id} value={trigger.id}>
                    {trigger.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedTrigger === "timer" && (
            <div className="pt-4">
              Number of seconds of which to run the timer
              <Input
                type="number"
                value={metadata.time}
                onChange={(e) =>
                  setMetadata((m) => ({ ...m, time: Number(e.target.value) }))
                }
              />
            </div>
          )}
          {selectedTrigger === "price-trigger" && (
            <div className="">
              Price:
              <Input
                type="number"
                value={metadata.price}
                onChange={(e) =>
                  setMetadata((m) => ({ ...m, price: Number(e.target.value) }))
                }
              />
              Asset
              <Select
                value={metadata.asset}
                onValueChange={(value) =>
                  setMetadata({ ...metadata, asset: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an Asset" />
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
          )}
        </SheetHeader>
        <SheetFooter>
          <Button
            onClick={() => onSelect(selectedTrigger, metadata)}
            type="submit"
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
