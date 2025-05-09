
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/Header";
import { Clock, ArrowLeft, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Save } from "lucide-react";
import type { Note } from "@/types";
import { useToast } from "@/hooks/use-toast";

const sampleNotes: Note[] = [
  {
    id: "1",
    title: "Mid test exam",
    content: "Ultrices viverra odio congue lecos felis, libero egestas nunc sagi are masa, elit ornare eget sem veib in ulum. In augue cursus of adipicing felis, diam volutpat mauris, id and",
    createdAt: "2021/12/12 10:30",
    color: "yellow"
  },
  {
    id: "2",
    title: "Mid test exam",
    content: "Ultrices viverra odio congue lecos felis, libero egestas nunc sagi are masa, elit ornare eget sem veib in ulum. In augue cursus of adipicing felis, diam volutpat mauris, id and",
    createdAt: "2021/12/12 10:30",
    color: "pink"
  },
  {
    id: "3",
    title: "Jonas's notes",
    content: "Rokity viverra odio congue lecos felis, libero egestas nunc sagi are masa, elit ornare eget sem veib in ulum. In augue cursus of adipicing felis, diam volutpat mauris, id and",
    createdAt: "2021/12/12 04:30",
    color: "blue"
  },
];

const NoteView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find note based on ID or create a new one if id is "new"
  const isNew = id === "new";
  const foundNote = !isNew ? sampleNotes.find(note => note.id === id) : null;
  
  const [title, setTitle] = useState(foundNote?.title || "");
  const [content, setContent] = useState(foundNote?.content || "");
  const [color, setColor] = useState<"blue" | "pink" | "yellow" | "green" | undefined>(foundNote?.color);
  const [isEditing, setIsEditing] = useState(isNew);
  
  // Format handlers
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("left");
  
  useEffect(() => {
    if (!isNew && !foundNote) {
      toast({
        title: "Note not found",
        description: "The requested note could not be found.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [foundNote, isNew, navigate, toast]);

  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Note title cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    // Logic to save the note
    toast({
      title: "Success",
      description: isNew ? "Note created successfully" : "Note updated successfully",
    });
    
    console.log("Save note:", { id, title, content, color });
    navigate("/");
  };
  
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

  // Text formatting handlers
  const handleBold = () => {
    setIsBold(!isBold);
    document.execCommand('bold', false);
  };
  
  const handleItalic = () => {
    setIsItalic(!isItalic);
    document.execCommand('italic', false);
  };
  
  const handleUnderline = () => {
    setIsUnderline(!isUnderline);
    document.execCommand('underline', false);
  };
  
  const handleAlignment = (align: "left" | "center" | "right") => {
    setAlignment(align);
    document.execCommand(`justify${align}`, false);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-screen">
        <Header title={isNew ? "NEW NOTE" : "VIEW NOTE"} />
        
        <div className="flex items-center gap-4 border-b p-4">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft size={18} />
            <span>Back</span>
          </Button>
          
          {!isNew && (
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "View Mode" : "Edit Mode"}
            </Button>
          )}
          
          {isEditing && (
            <>
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-none ${isBold ? 'bg-gray-100' : ''}`}
                  onClick={handleBold}
                >
                  <Bold size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-none ${isItalic ? 'bg-gray-100' : ''}`}
                  onClick={handleItalic}
                >
                  <Italic size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-none ${isUnderline ? 'bg-gray-100' : ''}`}
                  onClick={handleUnderline}
                >
                  <Underline size={16} />
                </Button>
              </div>
              
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-none ${alignment === 'left' ? 'bg-gray-100' : ''}`}
                  onClick={() => handleAlignment("left")}
                >
                  <AlignLeft size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-none ${alignment === 'center' ? 'bg-gray-100' : ''}`}
                  onClick={() => handleAlignment("center")}
                >
                  <AlignCenter size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-none ${alignment === 'right' ? 'bg-gray-100' : ''}`}
                  onClick={() => handleAlignment("right")}
                >
                  <AlignRight size={16} />
                </Button>
              </div>
              
              <div className="flex gap-2 ml-auto">
                <label className="flex items-center gap-2">
                  Color:
                  <select 
                    className="border rounded p-1"
                    value={color || ""}
                    onChange={(e) => setColor(e.target.value as any || undefined)}
                  >
                    <option value="">Default</option>
                    <option value="blue">Blue</option>
                    <option value="pink">Pink</option>
                    <option value="yellow">Yellow</option>
                    <option value="green">Green</option>
                  </select>
                </label>
                
                <Button onClick={handleSave}>
                  <Save size={16} className="mr-2" />
                  Save
                </Button>
              </div>
            </>
          )}
        </div>
        
        <div className={`flex-1 overflow-auto p-6 ${color ? `bg-${color}-50` : ''}`}>
          {!isNew && foundNote && !isEditing && (
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Clock size={16} className="mr-1" />
              <span>{timeString(foundNote.createdAt)}, {dayOfWeek(foundNote.createdAt)} - {formatDate(foundNote.createdAt)}</span>
            </div>
          )}
          
          {isEditing ? (
            <div className="h-full flex flex-col">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note Title"
                className="text-2xl font-semibold mb-4 p-2 border-b w-full focus:outline-none"
              />
              
              <div 
                className="flex-1 p-2 border rounded-md focus:outline-none font-[Times_New_Roman] whitespace-pre-wrap"
                contentEditable
                onInput={(e) => setContent(e.currentTarget.textContent || '')}
                suppressContentEditableWarning
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          ) : (
            <div className="h-full">
              <h1 className="text-2xl font-semibold mb-6">{title}</h1>
              <div className="prose max-w-none font-[Times_New_Roman]">{content}</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NoteView;
