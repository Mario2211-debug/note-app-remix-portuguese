
import { useState } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { NoteCard } from "@/components/NoteCard";
import { FolderCard } from "@/components/FolderCard";
import type { Folder, Note } from "@/types";

const trashedNotes: Note[] = [
  {
    id: "1",
    title: "Outdated Task List",
    content: "Old tasks that are no longer relevant or have been completed.",
    createdAt: "2021/11/20 15:20",
    color: "blue"
  },
  {
    id: "2",
    title: "Draft Email",
    content: "First draft of the project proposal email, replaced with newer version.",
    createdAt: "2021/11/15 11:10",
    color: "pink"
  },
];

const trashedFolders: Folder[] = [
  { id: "1", title: "Temporary Notes", createdAt: "2021/11/05", color: "yellow" },
];

const Trash = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const toggleSelectItem = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  const selectAll = (items: (Note | Folder)[]) => {
    setSelectedItems(items.map(item => item.id));
  };
  
  const clearSelection = () => {
    setSelectedItems([]);
  };
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <Header title="TRASH" />
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Deleted Items</h2>
            
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">
                Items will be permanently deleted after 30 days
              </p>
              
              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={clearSelection}>
                    Cancel
                  </Button>
                  <Button size="sm">Restore</Button>
                  <Button variant="destructive" size="sm">Delete Forever</Button>
                </div>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="notes">Notes ({trashedNotes.length})</TabsTrigger>
              <TabsTrigger value="folders">Folders ({trashedFolders.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="notes">
              <div className="flex justify-end mb-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => selectAll(trashedNotes)}
                >
                  Select All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trashedNotes.map(note => (
                  <div key={note.id} className="relative group" onClick={() => toggleSelectItem(note.id)}>
                    <div className={`absolute top-2 right-2 h-5 w-5 rounded border z-10 ${
                      selectedItems.includes(note.id) ? 'bg-primary border-primary' : 'border-gray-300 bg-white'
                    }`}>
                      {selectedItems.includes(note.id) && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <NoteCard note={note} />
                  </div>
                ))}
              </div>
              
              {trashedNotes.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">No items in trash</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="folders">
              <div className="flex justify-end mb-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => selectAll(trashedFolders)}
                >
                  Select All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {trashedFolders.map(folder => (
                  <div key={folder.id} className="relative group" onClick={() => toggleSelectItem(folder.id)}>
                    <div className={`absolute top-2 right-2 h-5 w-5 rounded border z-10 ${
                      selectedItems.includes(folder.id) ? 'bg-primary border-primary' : 'border-gray-300 bg-white'
                    }`}>
                      {selectedItems.includes(folder.id) && (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                          <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <FolderCard folder={folder} />
                  </div>
                ))}
              </div>
              
              {trashedFolders.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">No folders in trash</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Trash;
