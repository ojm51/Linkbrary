import { TLinkDto } from '@/lib/react-query';
import Image from 'next/image';
import Link from 'next/link';
import star from '@/assets/icons/ic_star.svg';
import starSelected from '@/assets/icons/ic_star_selected.svg';
import emptyImg from '@/assets/images/empty.jpeg';

export const CardHeader = ({
  url,
  imageSource,
  title,
  id,
  favorite,
}: Pick<TLinkDto, 'url' | 'imageSource' | 'title' | 'id' | 'favorite'>) => {
  return (
    <div className="relative">
      <Link href={url} target="_blank">
        <div className="relative w-full h-0 pt-[56.25%]">
          <Image
            priority
            className="rounded-2xl"
            src={imageSource || emptyImg}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </Link>
      <Image
        id={String(id)}
        className="absolute top-5 right-3 hover:scale-110 cursor-pointer"
        src={favorite ? starSelected : star}
        alt=""
        width={34}
        height={34}
        data-favorite={!favorite}
      />
    </div>
  );
};
