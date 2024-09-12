import { useEffect, useState } from 'react';
import { TFolderDto, TLinksQuery, TQueryResponse } from '@/lib/react-query';
import { getPageSize } from '@/lib/utils/links';
import { TClientSize } from './use-client-size';

export const useLinksQueryAction = (
  clientSize: TClientSize,
  allFolders: TQueryResponse<TFolderDto[]>,
) => {
  const [linksQuery, setlinksQuery] = useState<TLinksQuery>(undefined);

  const initializer = (width: number, allFoldersData: TFolderDto[]) => {
    const folder = allFoldersData.find(
      (folderData) => folderData.name === '전체',
    ) as TFolderDto;

    const initQuery: TLinksQuery = {
      page: 1,
      pageSize: getPageSize(width),
      keyword: '',
      folderId: folder.id,
    };
    setlinksQuery(initQuery);
  };

  const updator = (updatedQuery: Partial<TLinksQuery>) => {
    setlinksQuery((prevQuery) =>
      !prevQuery
        ? undefined
        : {
            ...prevQuery,
            ...updatedQuery,
          },
    );
  };

  useEffect(() => {
    if (clientSize && allFolders) {
      initializer(clientSize.width, allFolders.data);
    }
  }, [clientSize, allFolders]);

  return { data: linksQuery, updator };
};
