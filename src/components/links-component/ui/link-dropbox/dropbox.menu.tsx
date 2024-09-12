import { PropsWithChildren } from 'react';

export const DropBoxMenu = ({
  children,
  isOpen,
}: { isOpen?: boolean } & PropsWithChildren) => {
  const ulStyle = 'absolute top-0 -left-[300%] min-w-max bg-white shadow-lg';
  return (
    <ul className={`${isOpen ? 'auto' : 'hidden'} ${ulStyle}`}>{children}</ul>
  );
};
