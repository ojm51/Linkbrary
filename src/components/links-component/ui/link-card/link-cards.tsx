import { linkOptions, TLinkDto } from '@/lib/react-query';
import { useContext } from 'react';
import { FolderContext } from '@/lib/context';
import { useQuery } from '@tanstack/react-query';
import { LinkCard } from './link-card';

export const LinkCards = () => {
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

  /** @TODO 저장된 링크가 없는 경우 화면 처리하기 */
  return (
    <section className="p-8 lg:container lg:mx-auto">
      <ul className="grid grid-flow-row auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {linkList.map((card: TLinkDto) => {
          return (
            <li key={card.id}>
              <LinkCard data={card} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
