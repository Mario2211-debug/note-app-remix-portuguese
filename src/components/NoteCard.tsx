
import { Clock, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Note } from "@/types";

interface NoteCardProps {
  note: Note;
  isNew?: boolean;
  onClick?: () => void;
}

export function NoteCard({ note, isNew = false, onClick }: NoteCardProps) {
  if (isNew) {
    return (
      <div 
        onClick={onClick}
        className="border-2 border-dashed border-gray-300 rounded-lg h-[180px] flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
      >
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-xl">+</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm">New Note</p>
        </div>
      </div>
    );
  }
  
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
  
  return (
    <div className={cn(
      "note-card",
      note.color ? `folder-card-${note.color}` : "bg-white"
    )}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium">{note.title}</h3>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal size={16} />
        </Button>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">{note.content}</p>
      
      <div className="flex items-center text-xs text-gray-500">
        <Clock size={14} className="mr-1" />
        <span>{timeString(note.createdAt)}, {dayOfWeek(note.createdAt)}</span>
      </div>
    </div>
  );
}
