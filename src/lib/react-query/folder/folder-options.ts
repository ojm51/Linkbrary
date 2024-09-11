import { queryOptions } from "@tanstack/react-query";
import { folderServices } from "./folder-services";

export const folderOptions = {
  all: () => {
    return queryOptions({
      queryKey: ['folders', 'all'],
      queryFn: (context) => folderServices(context).all(),
      staleTime: 180000,
      gcTime: 200000,
    });
  },
};
