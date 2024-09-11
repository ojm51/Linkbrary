import { QueryFunctionContext } from '@tanstack/react-query';
import { instance } from '@/lib/api';
import { TQueryResponse } from '../types';

export type TFolder = {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
};

export type TFolderDto = {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
};

export const folderServices = ({ signal }: QueryFunctionContext) => ({
  all: async (): Promise<TQueryResponse<TFolderDto[]>> => {
    const response = await instance.get<TFolder[]>('/folders', { signal });
    const { data } = response;
    return { data };
  },
});
