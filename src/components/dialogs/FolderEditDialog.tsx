
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Folder } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface FolderEditDialogProps {
  folder: Folder;
  onUpdate?: (updatedFolder: Folder) => void;
}

export function FolderEditDialog({ folder, onUpdate }: FolderEditDialogProps) {
  const [title, setTitle] = useState(folder.title);
  const [color, setColor] = useState<"blue" | "pink" | "yellow" | "green">(folder.color);
  
  const { toast } = useToast();
  
  const handleUpdate = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Folder title cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    const updatedFolder = {
      ...folder,
      title,
      color
    };
    
    console.log("Update folder:", updatedFolder);
    toast({
      title: "Success",
      description: "Folder updated successfully",
    });
    
    if (onUpdate) onUpdate(updatedFolder);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Folder</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="folder-title">Folder Title</Label>
          <Input 
            id="folder-title" 
            placeholder="Enter folder title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Color</Label>
          <div className="flex gap-3">
            {["blue", "pink", "yellow", "green"].map((c) => (
              <div 
                key={c}
                className={`w-6 h-6 rounded-full bg-${c}-500 cursor-pointer ${color === c ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                onClick={() => setColor(c as "blue" | "pink" | "yellow" | "green")}
              />
            ))}
          </div>
        </div>
      </div>
      
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline" type="button" className="mr-2">
            Cancel
          </Button>
        </DialogClose>
        <Button type="button" onClick={handleUpdate}>
          Save Changes
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
