import { createContext } from 'react';
import { ModalContextType, useModalHandler } from './useModalHandler';

export const ModalContext = createContext<ModalContextType>({
  modalList: [],
  openModal: () => {},
  closeModal: () => {},
});

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const modalProviderValue = useModalHandler();
  return (
    <ModalContext.Provider value={modalProviderValue}>
      {children}
    </ModalContext.Provider>
  );
};
