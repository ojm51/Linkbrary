import { PropsWithChildren } from 'react';

export const ModalClose = ({
  children,
  onClick,
}: PropsWithChildren & {
  onClick: () => void;
}) => {
  return (
    <div className="absolute right-4 top-4 cursor-pointer" onClick={onClick}>
      {children}
    </div>
  );
};
