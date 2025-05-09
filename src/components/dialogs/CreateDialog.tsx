
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function CreateDialog() {
  const [activeTab, setActiveTab] = useState("folder");
  const [folderTitle, setFolderTitle] = useState("");
  const [folderColor, setFolderColor] = useState<"blue" | "pink" | "yellow" | "green">("blue");
  const [noteTitle, setNoteTitle] = useState("");
  
  const { toast } = useToast();
  
  const handleCreateFolder = () => {
    if (!folderTitle.trim()) {
      toast({
        title: "Error",
        description: "Folder title cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Create folder:", { title: folderTitle, color: folderColor });
    toast({
      title: "Success",
      description: "Folder created successfully",
    });
    setFolderTitle("");
  };
  
  const handleCreateNote = () => {
    if (!noteTitle.trim()) {
      toast({
        title: "Error",
        description: "Note title cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Create note:", { title: noteTitle });
    toast({
      title: "Success",
      description: "Note created successfully",
    });
    setNoteTitle("");
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create New</DialogTitle>
      </DialogHeader>
      
      <Tabs defaultValue="folder" value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="folder">Folder</TabsTrigger>
          <TabsTrigger value="note">Note</TabsTrigger>
        </TabsList>
        
        <TabsContent value="folder" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="folder-title">Folder Title</Label>
            <Input 
              id="folder-title" 
              placeholder="Enter folder title" 
              value={folderTitle}
              onChange={(e) => setFolderTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex gap-3">
              {["blue", "pink", "yellow", "green"].map((color) => (
                <div 
                  key={color}
                  className={`w-6 h-6 rounded-full bg-${color}-500 cursor-pointer ${folderColor === color ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                  onClick={() => setFolderColor(color as "blue" | "pink" | "yellow" | "green")}
                />
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="note" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="note-title">Note Title</Label>
            <Input 
              id="note-title" 
              placeholder="Enter note title" 
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
          </div>
        </TabsContent>
      </Tabs>
      
      <DialogFooter className="mt-4">
        <Button variant="outline" type="button" className="mr-2">
          Cancel
        </Button>
        <Button 
          type="button"
          onClick={activeTab === "folder" ? handleCreateFolder : handleCreateNote}
        >
          Create {activeTab === "folder" ? "Folder" : "Note"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
