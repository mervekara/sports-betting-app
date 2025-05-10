import { EVENT_TABS } from "../../constants/events";
import { Button } from "../ui/Button";

type Props = {
  selectedTab: string;
  onSelect: (tab: "Odds" | "Info") => void;
};

export const Tabs = ({ selectedTab, onSelect }: Props) => (
  <div className="flex justify-center mb-4 gap-2">
    {EVENT_TABS.map((tab) => (
      <Button
        key={tab}
        variant={selectedTab === tab ? "primary" : "secondary"}
        onClick={() => onSelect(tab as "Odds" | "Info")}
      >
        {tab}
      </Button>
    ))}
  </div>
);
