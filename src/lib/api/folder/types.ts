export interface FolderTypes {
  createdAt: string;
  id: number;
  linkCount?: number;
  name: string;
}

export interface LinkTypes {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
}

export interface GetFolderParams {
  folderId: number;
}

export interface PostFolderParams {
  folderName: string;
}

export interface PostLinkParams {
  url: string;
  folderId: number;
}

export interface PutFolderParams {
  newFolderName: string;
  folderId: number;
}

export interface DeleteFolderParams {
  folderId: number;
}
