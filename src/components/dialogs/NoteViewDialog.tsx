
import { Button } from "@/components/ui/button";
import { 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import type { Note } from "@/types";
import { Clock, MoreHorizontal, PenLine, Trash } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { NoteEditDialog } from "./NoteEditDialog";
import { useToast } from "@/hooks/use-toast";

interface NoteViewDialogProps {
  note: Note;
  onDelete?: () => void;
}

export function NoteViewDialog({ note, onDelete }: NoteViewDialogProps) {
  const { toast } = useToast();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  };
  
  const timeString = (dateString: string) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  };
  
  const dayOfWeek = (dateString: string) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return days[date.getDay()];
  };
  
  const handleDelete = () => {
    console.log("Delete note:", note.id);
    toast({
      title: "Success",
      description: "Note deleted successfully",
    });
    if (onDelete) onDelete();
  };
  
  return (
    <DialogContent className={`sm:max-w-[700px] max-h-[80vh] overflow-y-auto ${note.color ? `bg-${note.color}-50` : ''}`}>
      <DialogHeader className="flex flex-row items-center justify-between">
        <DialogTitle className="text-xl">{note.title}</DialogTitle>
        
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
                  Edit Note
                </DropdownMenuItem>
              </DialogTrigger>
              <NoteEditDialog note={note} />
            </Dialog>
            <DropdownMenuItem className="text-red-500" onClick={handleDelete}>
              <Trash size={16} className="mr-2" />
              Delete Note
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DialogHeader>
      
      <div className="mt-4">
        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Clock size={16} className="mr-1" />
          <span>{timeString(note.createdAt)}, {dayOfWeek(note.createdAt)} - {formatDate(note.createdAt)}</span>
        </div>
        
        <div className="prose max-w-none">
          <p className="whitespace-pre-line">{note.content}</p>
        </div>
      </div>
      
      <DialogFooter className="mt-8">
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
