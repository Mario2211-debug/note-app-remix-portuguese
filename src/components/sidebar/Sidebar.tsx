
import { NavLink } from "react-router-dom";
import { Archive, Calendar, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ColorDotProps {
  color: string;
}

const ColorDot = ({ color }: ColorDotProps) => (
  <div className={`w-4 h-4 rounded-full bg-${color}-500 mx-auto my-1`}></div>
);

export function Sidebar() {
  return (
    <aside className="w-[230px] h-screen bg-white border-r flex flex-col p-5">
      <div className="flex items-center gap-2 mb-8">
        <div className="flex items-center">
          <div className="h-6 w-6 rounded-full bg-blue-600"></div>
          <div className="h-6 w-6 rounded-full bg-blue-900 -ml-2 opacity-50"></div>
        </div>
        <span className="text-blue-900 font-semibold">MINO</span>
      </div>
      
      <Button variant="outline" className="flex gap-2 mb-6">
        <Plus size={18} />
        <span>Add new</span>
      </Button>
      
      <div className="mb-6 flex flex-col items-center">
        <ColorDot color="yellow" />
        <ColorDot color="blue" />
        <ColorDot color="red" />
      </div>
      
      <div className="space-y-4">
        <NavLink 
          to="/calendar"
          className={({ isActive }) => cn(
            "flex items-center gap-2 text-gray-500 hover:text-gray-900 py-1",
            isActive && "font-semibold text-gray-900"
          )}
        >
          <Calendar size={18} />
          <span>Calendar</span>
        </NavLink>
        
        <NavLink 
          to="/archive"
          className={({ isActive }) => cn(
            "flex items-center gap-2 text-gray-500 hover:text-gray-900 py-1",
            isActive && "font-semibold text-gray-900"
          )}
        >
          <Archive size={18} />
          <span>Archive</span>
        </NavLink>
        
        <NavLink 
          to="/trash"
          className={({ isActive }) => cn(
            "flex items-center gap-2 text-gray-500 hover:text-gray-900 py-1",
            isActive && "font-semibold text-gray-900"
          )}
        >
          <Trash size={18} />
          <span>Trash</span>
        </NavLink>
      </div>
      
      <div className="mt-auto">
        <div className="border rounded-md p-4 text-center">
          <div className="flex justify-center mb-2">
            <img src="/lovable-uploads/10677b01-804f-4bde-9358-8f69585d9548.png" alt="Person icon" className="w-20 h-auto" />
          </div>
          <p className="text-xs text-gray-500 mb-2">
            Want to access unlimited notes taking experience & lots of feature?
          </p>
          <Button className="w-full bg-blue-900 hover:bg-blue-800">
            Upgrade pro
          </Button>
        </div>
      </div>
    </aside>
  );
}
