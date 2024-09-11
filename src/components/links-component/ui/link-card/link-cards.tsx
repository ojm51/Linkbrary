import { TLinkDto } from "@/lib/react-query";
import { useLinksContextSelector } from "../../providers";
import { LinkCard } from "./link-card";

export const LinkCards = () => {
  const { linksAction } = useLinksContextSelector();
  return (
    <section className="p-8 lg:container lg:mx-auto">
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