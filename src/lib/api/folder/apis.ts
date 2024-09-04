import { API_PATH, instance } from '../config';
import { FolderTypes, PostAddFolderParams } from './types';

export const getFolderList = async () => {
  const response = await instance.get<FolderTypes[]>(API_PATH.folder.default);

  return response.data ?? [];
};

export const postAddFolder = async ({ folderName }: PostAddFolderParams) => {
  const params = { name: folderName };
  const response = await instance.post<FolderTypes[]>(
    API_PATH.folder.default,
    JSON.stringify(params),
  );

  return response.data ?? [];
};
