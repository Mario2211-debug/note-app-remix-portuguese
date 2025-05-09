
import { cn } from "@/lib/utils";

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export function TabNavigation({ tabs, activeTab, onChange }: TabNavigationProps) {
  return (
    <div className="flex border-b mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            "px-4 py-2 text-sm text-gray-500 hover:text-gray-800",
            activeTab === tab && "active-tab"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
