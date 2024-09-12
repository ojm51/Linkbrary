import { PropsWithChildren } from 'react';

export const ModalFrame = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative flex flex-col justify-center items-center w-[30%] h-auto bg-white z-50 py-8 px-10">
      {children}
    </div>
  );
};
