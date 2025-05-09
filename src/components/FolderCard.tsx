
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import type { Folder } from "@/types";

interface FolderCardProps {
  folder: Folder;
  isNew?: boolean;
  onClick?: () => void;
}

export function FolderCard({ folder, isNew = false, onClick }: FolderCardProps) {
  const navigate = useNavigate();
  
  const colorClasses = {
    blue: "bg-blue-50",
    pink: "bg-pink-50",
    yellow: "bg-yellow-50",
    green: "bg-green-50",
  };
  
  const iconClasses = {
    blue: "bg-blue-200",
    pink: "bg-pink-200",
    yellow: "bg-yellow-200",
    green: "bg-green-200",
  };
  
  if (isNew) {
    return (
      <div
        onClick={onClick}
        className="border-2 border-dashed border-gray-300 rounded-xl h-[140px] flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
      >
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center">
                <span className="text-xl text-gray-400">+</span>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium">New folder</p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      onClick={() => navigate(`/folder/${folder.id}`)}
      className={cn(
        "rounded-xl p-6 cursor-pointer h-[140px]",
        folder.color ? colorClasses[folder.color] : "bg-white",
      )}
    >
      <div className="flex items-start justify-between">
        <div className={cn(
          "p-3 rounded-lg",
          folder.color ? iconClasses[folder.color] : "bg-gray-100"
        )}>
          <div className={cn(
            "h-8 w-8 rounded-lg",
            folder.color ? `bg-${folder.color}-400` : "bg-gray-300"
          )}></div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
        >
          <MoreHorizontal size={16} />
        </Button>
      </div>
      
      <div className="mt-4">
        <h3 className="font-medium">{folder.title}</h3>
        <p className="text-xs text-gray-500 mt-1">{folder.createdAt}</p>
      </div>
    </div>
  );
}
