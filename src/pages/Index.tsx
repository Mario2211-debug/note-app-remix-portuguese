
import { useState } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/Header";
import { TabNavigation } from "@/components/TabNavigation";
import { FolderCard } from "@/components/FolderCard";
import { NoteCard } from "@/components/NoteCard";
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
            <FolderCard 
              isNew 
              folder={{ id: "", title: "", createdAt: "", color: "blue" }}
              onClick={() => console.log("Create new folder")}
            />
          </div>
        </div>
        
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Notes</h2>
            
            <div className="flex items-center gap-2">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleNotes.map(note => (
              <NoteCard key={note.id} note={note} />
            ))}
            <NoteCard 
              isNew 
              note={{ id: "", title: "", content: "", createdAt: "" }}
              onClick={() => console.log("Create new note")}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
