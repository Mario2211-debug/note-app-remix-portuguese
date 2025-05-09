
import { useState } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/Header";
import { TabNavigation } from "@/components/TabNavigation";
import { FolderCard } from "@/components/FolderCard";
import { NoteCard } from "@/components/NoteCard";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateDialog } from "@/components/dialogs/CreateDialog";
import { LayoutGrid, List, Table, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NoteViewDialog } from "@/components/dialogs/NoteViewDialog";
import type { Folder, Note } from "@/types";

const sampleFolders: Folder[] = [
  { id: "1", title: "Movie Review", createdAt: "2021/12/12", color: "blue" },
  { id: "2", title: "Class Notes", createdAt: "2021/12/12", color: "pink" },
  { id: "3", title: "Book Lists", createdAt: "2021/12/12", color: "yellow" },
];

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

const Index = () => {
  const [folderActiveTab, setFolderActiveTab] = useState("Todays");
  const [noteActiveTab, setNoteActiveTab] = useState("Todays");
  const [currentMonth, setCurrentMonth] = useState("December 2021");
  const [noteViewMode, setNoteViewMode] = useState<"grid" | "list" | "table">("grid");
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <Header title="MY NOTES" />
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Folders</h2>
          
          <TabNavigation 
            tabs={["Todays", "This Week", "This Month"]}
            activeTab={folderActiveTab}
            onChange={setFolderActiveTab}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sampleFolders.map(folder => (
              <FolderCard key={folder.id} folder={folder} />
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <div>
                  <FolderCard 
                    isNew 
                    folder={{ id: "", title: "", createdAt: "", color: "blue" }}
                  />
                </div>
              </DialogTrigger>
              <CreateDialog />
            </Dialog>
          </div>
        </div>
        
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Notes</h2>
            
            <div className="flex items-center gap-2">
              <div className="flex border rounded-md overflow-hidden mr-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-none ${noteViewMode === 'grid' ? 'bg-gray-100' : ''}`}
                  onClick={() => setNoteViewMode("grid")}
                >
                  <LayoutGrid size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-none ${noteViewMode === 'list' ? 'bg-gray-100' : ''}`}
                  onClick={() => setNoteViewMode("list")}
                >
                  <List size={16} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 rounded-none ${noteViewMode === 'table' ? 'bg-gray-100' : ''}`}
                  onClick={() => setNoteViewMode("table")}
                >
                  <Table size={16} />
                </Button>
              </div>
              
              <button className="text-gray-500 hover:text-gray-700">
                ◀
              </button>
              <span>{currentMonth}</span>
              <button className="text-gray-500 hover:text-gray-700">
                ▶
              </button>
            </div>
          </div>
          
          <TabNavigation 
            tabs={["Todays", "This Week", "This Month"]}
            activeTab={noteActiveTab}
            onChange={setNoteActiveTab}
          />
          
          {noteViewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleNotes.map(note => (
                <NoteCard key={note.id} note={note} />
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <div>
                    <NoteCard 
                      isNew 
                      note={{ id: "", title: "", content: "", createdAt: "" }}
                    />
                  </div>
                </DialogTrigger>
                <CreateDialog />
              </Dialog>
            </div>
          )}
          
          {noteViewMode === "list" && (
            <div className="space-y-2">
              {sampleNotes.map(note => (
                <Dialog key={note.id}>
                  <DialogTrigger asChild>
                    <div className={`p-4 border rounded-md flex justify-between items-center cursor-pointer ${note.color ? `bg-${note.color}-50` : 'bg-white'}`}>
                      <div>
                        <h3 className="font-medium">{note.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1">{note.content}</p>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>{note.createdAt.split(' ')[1]}</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <NoteViewDialog note={note} />
                </Dialog>
              ))}
            </div>
          )}
          
          {noteViewMode === "table" && (
            <div className="border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 text-left">
                  <tr>
                    <th className="p-3">Title</th>
                    <th className="p-3">Created At</th>
                    <th className="p-3">Color</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleNotes.map(note => (
                    <Dialog key={note.id}>
                      <DialogTrigger asChild>
                        <tr className="border-t cursor-pointer hover:bg-gray-50">
                          <td className="p-3">{note.title}</td>
                          <td className="p-3">{note.createdAt}</td>
                          <td className="p-3">
                            {note.color && (
                              <div className={`w-4 h-4 rounded-full bg-${note.color}-500`}></div>
                            )}
                          </td>
                        </tr>
                      </DialogTrigger>
                      <NoteViewDialog note={note} />
                    </Dialog>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
