
import { useState } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/Header";
import { TabNavigation } from "@/components/TabNavigation";
import { FolderCard } from "@/components/FolderCard";
import { NoteCard } from "@/components/NoteCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Folder, Note } from "@/types";

const archivedFolders: Folder[] = [
  { id: "1", title: "Work Documents", createdAt: "2021/11/05", color: "blue" },
  { id: "2", title: "Personal Projects", createdAt: "2021/10/22", color: "green" },
];

const archivedNotes: Note[] = [
  {
    id: "1",
    title: "Project Ideas",
    content: "List of potential projects to work on in the future. Need to prioritize based on timeline and resources.",
    createdAt: "2021/11/02 09:15",
    color: "blue"
  },
  {
    id: "2",
    title: "Meeting Minutes",
    content: "Notes from the team meeting on product roadmap and quarterly objectives.",
    createdAt: "2021/10/25 14:30",
    color: "green"
  },
  {
    id: "3",
    title: "Reading List",
    content: "Books and articles to read: 1. Atomic Habits 2. Deep Work 3. The Psychology of Money",
    createdAt: "2021/09/18 20:45",
    color: "yellow"
  },
];

const Archive = () => {
  const [timeFilter, setTimeFilter] = useState("This Month");
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <Header title="ARCHIVE" />
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Archived Items</h2>
            <TabNavigation 
              tabs={["This Month", "Last 3 Months", "All Time"]}
              activeTab={timeFilter}
              onChange={setTimeFilter}
            />
          </div>
          
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="folders">Folders</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notes">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {archivedNotes.map(note => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
              
              {archivedNotes.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">No archived notes</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="folders">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {archivedFolders.map(folder => (
                  <FolderCard key={folder.id} folder={folder} />
                ))}
              </div>
              
              {archivedFolders.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">No archived folders</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Archive;
