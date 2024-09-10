import axios from 'axios';
import {
  API_PATH,
  FolderTypes,
  GetFolderParams,
  LinkListResponseTypes,
} from '@/lib/api';

const tempInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  // timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getLinkListForSSR = async ({ folderId }: GetFolderParams) => {
  const response = await tempInstance.get<LinkListResponseTypes>(
    API_PATH.link.category(folderId),
  );

  return response.data.list ?? [];
};

export const getFolderDetail = async ({ folderId }: GetFolderParams) => {
  const response = await tempInstance.get<FolderTypes>(
    API_PATH.folder.detail(folderId),
  );

  return response.data ?? [];
};
