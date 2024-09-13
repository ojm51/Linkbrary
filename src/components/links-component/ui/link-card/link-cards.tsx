import { TLinkDto } from '@/lib/react-query';
import { LinkCard } from './link-card';
import { useLinksContextSelector } from '../../providers';

export const LinkCards = () => {
  const { linksAction } = useLinksContextSelector();
  return (
    <section className="py-8 lg:container lg:mx-auto">
      <ul className="grid grid-flow-row auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {linksAction.data?.data.list.map((card: TLinkDto) => {
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
