import { PropsWithChildren } from 'react';

export const DropBoxButton = ({
  children,
  onClick,
}: {
  onClick: () => void;
} & PropsWithChildren) => {
  return <button onClick={onClick}>{children}</button>;
};
