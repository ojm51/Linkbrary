import { PropsWithChildren } from 'react';

export const ModalRoot = ({
  children,
  open,
}: PropsWithChildren & {
  open: boolean;
}) => {
  return (
    <div
      className={`${open ? 'auto' : 'hidden'} fixed inset-0 w-screen h-screen flex justify-center items-center bg-gray-300 bg-opacity-30 z-40 overflow-hidden`}
    >
      {children}
    </div>
  );
};
