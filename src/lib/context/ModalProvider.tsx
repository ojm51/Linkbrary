import { createContext, useContext } from 'react';
import { ModalContextType, useModalHandler } from './useModalHandler';
import { Modal } from '@/components/common/modal/ModalContainer';

export const ModalContext = createContext<ModalContextType>({
  modalList: [],
  openModal: () => {},
  closeModal: () => {},
});

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const { modalList, openModal, closeModal } = useModalHandler();

  return (
    <ModalContext.Provider value={{ modalList, openModal, closeModal }}>
      {children}
      {modalList.map(({ key, ...rest }) => {
        return <Modal key={key} modalName={key} {...rest} />;
      })}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const modalCtx = useContext(ModalContext);
  if (!modalCtx) {
    throw new Error('컨텍스트는 프로바이더 안에서만 사용가능합니다.');
  }
  return modalCtx;
};
