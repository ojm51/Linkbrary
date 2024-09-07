export interface FolderTypes {
  createdAt: string;
  id: number;
  linkCount?: number;
  name: string;
}

export interface PostFolderParams {
  folderName: string;
}

export interface PostLinkParams {
  url: string;
  folderId?: number;
}

export interface PutFolderParams {
  folderName: string;
  folderId: number;
}

export interface AddFolderProps {
  getInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddFolder: () => void;
}
