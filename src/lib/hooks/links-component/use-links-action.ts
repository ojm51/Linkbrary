import { linkOptions, TLinksQuery } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';

export const useLinksAction = (query: TLinksQuery) =>
  useQuery(linkOptions.find(query));
