
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Folder } from "@/types";

interface FolderCardProps {
  folder: Folder;
  isNew?: boolean;
  onClick?: () => void;
}

export function FolderCard({ folder, isNew = false, onClick }: FolderCardProps) {
  if (isNew) {
    return (
      <div 
        onClick={onClick}
        className="border-2 border-dashed border-gray-300 rounded-lg h-[150px] flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
      >
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-xl">+</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm">New folder</p>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  };
  
  return (
    <div className={cn(
      "rounded-lg p-4 h-[150px] flex flex-col cursor-pointer",
      `folder-card-${folder.color}`
    )}>
      <div className="flex justify-between items-start mb-auto">
        <div className="w-10 h-10">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 8H20L24 12H32V32H8V8Z" fill="currentColor" fillOpacity="0.4"/>
          </svg>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal size={16} />
        </Button>
      </div>
      
      <div>
        <h3 className="font-semibold text-gray-800 mb-1">{folder.title}</h3>
        <p className="text-xs text-gray-600">{formatDate(folder.createdAt)}</p>
      </div>
    </div>
  );
}
