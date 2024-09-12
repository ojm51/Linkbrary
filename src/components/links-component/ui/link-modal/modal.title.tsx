import { PropsWithChildren } from 'react';

export const ModalTitle = ({ children }: PropsWithChildren) => {
  return <div className="font-bold text-xl">{children}</div>;
};
