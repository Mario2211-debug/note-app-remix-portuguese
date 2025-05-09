
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <div className="py-6 px-8 flex items-center justify-between bg-white">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-gray-100 rounded-full py-2 pl-10 pr-4 w-[220px] text-sm focus:outline-none"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sayef mahmud</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/lovable-uploads/10677b01-804f-4bde-9358-8f69585d9548.png" alt="User" />
            <AvatarFallback>SM</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
