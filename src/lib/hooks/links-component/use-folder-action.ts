import { folderOptions } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

export const useFolderAction = () => useQuery(folderOptions.all());
