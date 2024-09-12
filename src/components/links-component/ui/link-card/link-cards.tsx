import { linkOptions, TLinkDto } from '@/lib/react-query';
import { useContext } from 'react';
import { FolderContext } from '@/lib/context';
import { useQuery } from '@tanstack/react-query';
import { linkEntitiesToDtos } from '@/lib/utils/links';
import { LinkCard } from './link-card';
import { LinkComponentProps } from '../link.component';

export const LinkCards = ({ filterLinks, searchValue }: LinkComponentProps) => {
  const { selectedFolder } = useContext(FolderContext);
  const folderId = selectedFolder.id;
  const query = {
    folderId,
    page: 1,
    pageSize: 10,
    keyword: '',
  };

  const { data } = useQuery(linkOptions.find(query));
  const linkList = data?.data?.list ?? [];

  const viewLinks =
    searchValue.trim() === '' ? linkList : linkEntitiesToDtos(filterLinks);

  /** @TODO 저장된 링크가 없는 경우 화면 처리하기 */
  return (
    <section className="p-8 lg:container lg:mx-auto">
      {viewLinks.length > 0 ? (
        <ul className="grid grid-flow-row auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {viewLinks.map((card: TLinkDto) => {
            return (
              <li key={card.id}>
                <LinkCard data={card} />
              </li>
            );
          })}
        </ul>
      ) : (
        <h2 className="text-center font-bold text-lg my-5 md:text-3xl md:my-10">
          검색된 내용이 없습니다.
        </h2>
      )}
    </section>
  );
};
