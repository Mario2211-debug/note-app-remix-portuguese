
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { NoteCard } from "@/components/NoteCard";
import { Folder, Note } from "@/types";
import { TabNavigation } from "@/components/TabNavigation";
import { LayoutGrid, List, MoreHorizontal, PenLine, Table, Trash } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { FolderEditDialog } from "./FolderEditDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

// Mock data
const folderNotes: Note[] = [
  {
    id: "1",
    title: "Meeting notes",
    content: "Discuss project roadmap with the team and assign tasks",
    createdAt: "2021/12/12 10:30",
    folderId: "1",
    color: "blue"
  },
  {
    id: "2",
    title: "Ideas",
    content: "New feature concepts for the next sprint planning session",
    createdAt: "2021/12/12 10:30",
    folderId: "1",
    color: "pink"
  },
];

interface FolderViewDialogProps {
  folder: Folder;
  onDelete?: () => void;
}

export function FolderViewDialog({ folder, onDelete }: FolderViewDialogProps) {
  const [activeTab, setActiveTab] = useState("All Notes");
  const [viewMode, setViewMode] = useState<"grid" | "list" | "table">("grid");
  const { toast } = useToast();
  
  const handleDelete = () => {
    console.log("Delete folder:", folder.id);
    toast({
      title: "Success",
      description: "Folder deleted successfully",
    });
    if (onDelete) onDelete();
  };
  
  return (
    <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
      <DialogHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-6 h-6 rounded-full bg-${folder.color}-500`}></div>
          <DialogTitle className="text-xl">{folder.title}</DialogTitle>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 rounded-none ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 rounded-none ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode("list")}
            >
              <List size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className={`h-8 w-8 rounded-none ${viewMode === 'table' ? 'bg-gray-100' : ''}`}
              onClick={() => setViewMode("table")}
            >
              <Table size={16} />
            </Button>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <PenLine size={16} className="mr-2" />
                    Edit Folder
                  </DropdownMenuItem>
                </DialogTrigger>
                <FolderEditDialog folder={folder} />
              </Dialog>
              <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
                <Trash size={16} className="mr-2" />
                Delete Folder
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </DialogHeader>
      
      <div className="mt-4">
        <TabNavigation 
          tabs={["All Notes", "Recent", "Favorites"]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {folderNotes.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
            <NoteCard 
              isNew 
              note={{ id: "", title: "", content: "", createdAt: "" }}
              onClick={() => console.log("Create new note in folder")}
            />
          </div>
        )}
        
        {viewMode === "list" && (
          <div className="space-y-2">
            {folderNotes.map(note => (
              <div key={note.id} className={`p-3 border rounded-md flex justify-between items-center bg-${note.color || 'white'}-50`}>
                <div>
                  <h3 className="font-medium">{note.title}</h3>
                  <p className="text-xs text-gray-500">{note.createdAt}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal size={16} />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        {viewMode === "table" && (
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Created At</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {folderNotes.map(note => (
                  <tr key={note.id} className="border-t">
                    <td className="p-3">{note.title}</td>
                    <td className="p-3">{note.createdAt}</td>
                    <td className="p-3">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
