import axios from 'axios';
import {
  API_PATH,
  FolderTypes,
  GetFolderParams,
  LinkListResponseTypes,
} from '@/lib/api';

const tempInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFolderListForSSG = async () => {
  const response = await tempInstance.get<FolderTypes[]>(
    API_PATH.folder.default,
  );

  return response.data ?? [];
};

export const getLinkListForSSG = async ({ folderId }: GetFolderParams) => {
  const response = await tempInstance.get<LinkListResponseTypes>(
    API_PATH.link.category(folderId),
  );

  return response.data.list ?? [];
};

export const getFolder = async ({ folderId }: GetFolderParams) => {
  const response = await tempInstance.get<FolderTypes>(
    API_PATH.folder.detail(folderId),
  );

  return response.data ?? [];
};
