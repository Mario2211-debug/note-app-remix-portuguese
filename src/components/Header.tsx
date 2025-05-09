
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  username?: string;
}

export function Header({ title, username = "Sayef mahmud" }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between py-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            type="search" 
            placeholder="Search"
            className="pl-8 bg-gray-50 border-gray-200"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm">{username}</span>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{username.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        
        <Button variant="ghost" size="icon" className="ml-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="5" width="18" height="2" rx="1" fill="currentColor"/>
            <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor"/>
            <rect x="3" y="17" width="18" height="2" rx="1" fill="currentColor"/>
          </svg>
        </Button>
      </div>
    </header>
  );
}
