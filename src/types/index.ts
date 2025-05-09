
export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface Folder {
  id: string;
  title: string;
  createdAt: string;
  color: "blue" | "pink" | "yellow" | "green";
}

export interface Note {
  id: string;
  title: string;
  content: string;
  folderId?: string;
  createdAt: string;
  updatedAt?: string;
  color?: "blue" | "pink" | "yellow" | "green";
}
