import { TLink, TLinkDto } from '@/lib/react-query';

const TIME_UNITS = [
  { value: 31536000, text: 'years' },
  { value: 2592000, text: 'months' },
  { value: 86400, text: 'days' },
  { value: 3600, text: 'hours' },
  { value: 60, text: 'minutes' },
  { value: 1, text: 'seconds' },
];

const getRelativeTimeString = (createdDate: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - createdDate.getTime()) / 1000,
  );
  const result = TIME_UNITS.find(({ value }) => diffInSeconds >= value);
  if (result) {
    const { value, text } = result;
    const count = Math.floor(diffInSeconds / value);
    return `${count} ${text} ago`;
  }
  return 'a moment ago';
};

export const linkEntitiesToDtos = (entities: TLink[]): TLinkDto[] => {
  return entities.map(({ id, createdAt, imageSource, ...rest }) => {
    const createdDate = new Date(createdAt);
    const createdDateString = createdDate
      .toLocaleDateString('ko-KR')
      .slice(0, -1);
    const relativeTimeString = getRelativeTimeString(createdDate);
    return {
      id,
      createdAt: createdDateString,
      relativeTime: relativeTimeString,
      imageSource,
      ...rest,
    };
  });
};
