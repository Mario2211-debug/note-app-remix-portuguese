
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
import { Textarea } from "@/components/ui/textarea";
import type { Note } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface NoteEditDialogProps {
  note: Note;
  onUpdate?: (updatedNote: Note) => void;
}

export function NoteEditDialog({ note, onUpdate }: NoteEditDialogProps) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [color, setColor] = useState<"blue" | "pink" | "yellow" | "green" | undefined>(note.color);
  
  const { toast } = useToast();
  
  const handleUpdate = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Note title cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    const updatedNote = {
      ...note,
      title,
      content,
      color,
      updatedAt: new Date().toISOString()
    };
    
    console.log("Update note:", updatedNote);
    toast({
      title: "Success",
      description: "Note updated successfully",
    });
    
    if (onUpdate) onUpdate(updatedNote);
  };

  return (
    <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Edit Note</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="note-title">Title</Label>
          <Input 
            id="note-title" 
            placeholder="Enter note title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="note-content">Content</Label>
          <Textarea 
            id="note-content"
            placeholder="Write your note here..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
            className="resize-none"
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
            <div 
              className={`w-6 h-6 rounded-full bg-white border cursor-pointer ${color === undefined ? 'ring-2 ring-offset-2 ring-black' : ''}`}
              onClick={() => setColor(undefined)}
            />
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
