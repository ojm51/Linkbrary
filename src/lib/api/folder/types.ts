export interface FolderTypes {
  createdAt: string;
  id: number;
  linkCount?: number;
  name: string;
}

export interface PostAddFolderParams {
  folderName: string;
}

export interface AddFolderProps {
  getInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddFolder: () => void;
}
