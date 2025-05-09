
import { useState } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { NoteCard } from "@/components/NoteCard";
import type { Note } from "@/types";

const sampleNotes: Note[] = [
  {
    id: "1",
    title: "Meeting with Client",
    content: "Discuss project requirements and timeline. Prepare presentation slides.",
    createdAt: "2021/12/12 14:30",
    color: "blue"
  },
  {
    id: "2",
    title: "Grocery List",
    content: "Milk, eggs, bread, fruits, and vegetables. Don't forget to buy cat food.",
    createdAt: "2021/12/12 16:45",
    color: "yellow"
  },
];

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedNotes, setSelectedNotes] = useState(sampleNotes);
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <Header title="CALENDAR" />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border w-full"
              />
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Upcoming Events</h3>
                <div className="space-y-2">
                  <div className="flex items-center p-2 bg-gray-50 rounded">
                    <div className="w-2 h-10 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium">Team Meeting</p>
                      <p className="text-xs text-gray-500">10:30 AM - 12:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center p-2 bg-gray-50 rounded">
                    <div className="w-2 h-10 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium">Project Review</p>
                      <p className="text-xs text-gray-500">2:00 PM - 3:30 PM</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full mt-4">
                  Add New Event
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 xl:col-span-8">
            <h2 className="text-xl font-semibold mb-4">Notes for {date?.toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedNotes.map(note => (
                <NoteCard key={note.id} note={note} />
              ))}
              <NoteCard 
                isNew 
                note={{ id: "", title: "", content: "", createdAt: "" }}
                onClick={() => console.log("Create new note")}
              />
            </div>
            
            {selectedNotes.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">No notes for this date</p>
                <Button variant="outline" className="mt-4">Create New Note</Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calendar;
