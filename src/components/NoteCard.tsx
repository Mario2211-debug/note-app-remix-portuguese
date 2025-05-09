
import { Clock, ExternalLink, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import type { Note } from "@/types";

interface NoteCardProps {
  note: Note;
  isNew?: boolean;
  onClick?: () => void;
}

export function NoteCard({ note, isNew = false, onClick }: NoteCardProps) {
  const navigate = useNavigate();
  
  const cardClasses = {
    blue: "bg-blue-50",
    pink: "bg-pink-50",
    yellow: "bg-yellow-50",
    green: "bg-green-50",
  };
  
  if (isNew) {
    return (
      <div 
        onClick={() => navigate("/note/new")}
        className="border-2 border-dashed border-gray-300 rounded-xl h-[220px] flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
      >
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <div className="bg-gray-50 rounded-lg p-4">
              <ExternalLink size={20} className="text-gray-400" />
            </div>
          </div>
          <p className="text-gray-500 text-sm font-medium">New Note</p>
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
  
  const handleCardClick = () => {
    navigate(`/note/${note.id}`);
  };
  
  return (
    <div 
      onClick={handleCardClick}
      className={cn(
        "rounded-xl p-6 cursor-pointer h-[220px] flex flex-col",
        note.color ? cardClasses[note.color] : "bg-white"
      )}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium font-[Times_New_Roman]">{note.title}</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            // Additional menu actions could go here
          }}
        >
          <MoreHorizontal size={16} />
        </Button>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-4 flex-grow font-[Times_New_Roman]">{note.content}</p>
      
      <div className="mt-auto">
        <p className="text-xs text-gray-500">{formatDate(note.createdAt)}</p>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <Clock size={12} className="mr-1" />
          <span>{timeString(note.createdAt)}, {dayOfWeek(note.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
