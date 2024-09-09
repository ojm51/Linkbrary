import { useState } from 'react';

export interface ModalContextType {
  modalList: string[];
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
}

export const useModalHandler = () => {
  const [modalList, setModalList] = useState<string[]>([]);
  const openModal = (modalName: string) => {
    setModalList((prev) => [...prev, modalName]);
  };
  const closeModal = (modalName: string) => {
    setModalList((prev) => prev.filter((e) => e !== modalName));
  };
  return { modalList, openModal, closeModal };
};
