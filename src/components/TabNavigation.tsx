
import { cn } from "@/lib/utils";

interface TabNavigationProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}

export function TabNavigation({ tabs, activeTab, onChange }: TabNavigationProps) {
  return (
    <div className="border-b mb-6">
      <div className="flex gap-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={cn(
              "pb-2 px-1 text-sm transition-all font-medium relative",
              activeTab === tab
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-800"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
