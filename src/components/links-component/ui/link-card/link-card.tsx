import { TLinkDto } from '@/lib/react-query';
import { CardHeader } from './link-card.header';
import { CardBody } from './link-card.body';

type LinkCardProps = {
  data: TLinkDto;
};

export const LinkCard = ({ data }: LinkCardProps) => {
  const {
    title,
    imageSource,
    createdAt,
    description,
    favorite,
    relativeTime,
    id,
    url,
  } = data;
  return (
    <div className="shadow-lg rounded-2xl">
      <CardHeader
        title={title}
        imageSource={imageSource}
        favorite={favorite}
        id={id}
        url={url}
      />
      <CardBody
        id={id}
        createdAt={createdAt}
        description={description}
        relativeTime={relativeTime}
      />
    </div>
  );
};
