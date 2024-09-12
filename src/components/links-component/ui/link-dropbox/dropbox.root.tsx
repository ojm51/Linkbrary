import { PropsWithChildren } from 'react';

export const DropBoxRoot = ({ children }: PropsWithChildren) => {
  return <div className="relative">{children}</div>;
};
