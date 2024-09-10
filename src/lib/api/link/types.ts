export interface FavoriteLinkTypes {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
}
export interface FavoriteLinkListResponse {
  totalCount: number;
  list: FavoriteLinkTypes[];
}
