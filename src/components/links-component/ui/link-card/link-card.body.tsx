import { TLinkDto } from '@/lib/react-query';
import { DropBoxComponent } from './link-card.dropbox';

export const CardBody = ({
  id,
  relativeTime,
  title,
  description,
  createdAt,
}: Pick<
  TLinkDto,
  'id' | 'title' | 'relativeTime' | 'description' | 'createdAt'
>) => {
  return (
    <div className="flex flex-col gap-y-3 py-4 px-5 min-h-32">
      <ul className="flex justify-between">
        <li>
          <div className="text-xs">{relativeTime}</div>
        </li>
        <li>
          <DropBoxComponent id={id} />
        </li>
      </ul>
      <div className="h-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
        {title}
      </div>
      <div className="h-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
        {description}
      </div>
      <div>{createdAt}</div>
    </div>
  );
};
