import { queryOptions } from '@tanstack/react-query';
import { linkServices, TLinksQuery } from './link-services';

export const linkOptions = {
  find: (query: TLinksQuery) => {
    return queryOptions({
      queryKey: ['links', 'find', query],
      queryFn: ({ signal }) => linkServices.find(query, signal),
      staleTime: 180000,
      gcTime: 200000,
      enabled: !!query,
    });
  },
  favorite: () => {
    return {
      mutationFn: (query: { id: number; favorite: boolean }) =>
        linkServices.favorite(query),
    };
  },
  modify: () => {
    return {
      mutationFn: (query: { id: number; url: string }) =>
        linkServices.modify(query),
    };
  },
  delete: () => {
    return {
      mutationFn: (query: { id: number }) => linkServices.delete(query),
    };
  },
};
