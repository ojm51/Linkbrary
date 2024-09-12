import { useEffect, useState } from 'react';
import { TLinksQuery } from '@/lib/react-query';
import { getPageSize } from '@/lib/utils/links';
import { FolderTypes } from '@/lib/api';
import { TClientSize } from './use-client-size';

export const useLinksQueryAction = (
  clientSize: TClientSize,
  selectedFolder: FolderTypes,
) => {
  const [linksQuery, setlinksQuery] = useState<TLinksQuery>(undefined);

  const initializer = (width: number, initFolder: FolderTypes) => {
    // '전체' 폴더가 없을 경우 함수 실행을 중단
    if (!initFolder) {
      console.error("Error: '전체' 폴더를 찾을 수 없습니다.");
      return;
    }

    const initQuery: TLinksQuery = {
      page: 1,
      pageSize: getPageSize(width),
      keyword: '',
      folderId: initFolder.id,
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
    if (clientSize && selectedFolder) {
      initializer(clientSize.width, selectedFolder);
    }
  }, [clientSize, selectedFolder]);

  return { data: linksQuery, updator };
};
