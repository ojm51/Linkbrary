export interface LinkSearchParams {
  page: number;
  pageSize: number;
  search: string;
}
export interface LinkSearchData {
  id: number;
  title: string;
  url: string;
  description: string;
  imageSource: string;
  favorite: boolean;
  createdAt: string;
}

export interface LinkSearchType {
  totalCount: number;
  list: LinkSearchData[];
}
