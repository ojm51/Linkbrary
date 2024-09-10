import { ModalContentsProps } from '@/components/common/modal/ModalContainer';
import { useState } from 'react';

interface ModalType extends ModalContentsProps {
  key: string;
}

export interface ModalContextType {
  modalList: ModalType[];
  openModal: (modalContent: ModalType) => void;
  closeModal: (modalName: string) => void;
}

export const useModalHandler = () => {
  const [modalList, setModalList] = useState<ModalType[]>([]);
  const openModal = (modalContent: ModalType) => {
    setModalList((prev) => [...prev, { ...modalContent }]);
  };
  const closeModal = (modalKey: string) => {
    setModalList((prev) => prev.filter((e) => e.key !== modalKey));
  };
  return { modalList, openModal, closeModal };
};
