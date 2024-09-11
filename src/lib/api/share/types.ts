export interface LinkTypes {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
}

export interface LinkListResponseTypes {
  totalCount: number;
  list: LinkTypes[];
}
