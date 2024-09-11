import { useCustomContext } from '@/lib/hooks/links-component';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useMemo,
  useReducer,
} from 'react';

export type TModalMode = 'MODIFY' | 'DELETE' | '';

export type TModalType = 'MODIFY' | 'DELETE' | 'CLOSE';

export type TModalState = {
  mode: TModalMode;
  linkId: number;
};

export type TModalActions = {
  type: TModalType;
  payload?: TModalState;
};

export type TModalStore = {
  state: TModalState;
  modifyModal: (linkId: number) => void;
  deleteModal: (linkId: number) => void;
  closeModal: () => void;
};

const modalState: TModalState = {
  mode: '',
  linkId: 0,
};

const modalReducer = (state: TModalState, action: TModalActions) => {
  switch (action.type) {
    case 'MODIFY':
    case 'DELETE':
    case 'CLOSE':
      return { ...(action.payload as TModalState) };
    default:
      return state;
  }
};

export const ModalStoreContext = createContext<TModalStore | undefined>(
  undefined,
);

export const useModalStore = () => useCustomContext(ModalStoreContext);

export const ModalStoreProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(modalReducer, modalState);
  const updateModal = (
    type: TModalType,
    mode: TModalMode = '',
    linkId: number = 0,
  ) => {
    dispatch({ type, payload: { mode, linkId } });
  };
  const modifyModal = useCallback((linkId: number) => {
    updateModal('MODIFY', 'MODIFY', linkId);
  }, []);
  const deleteModal = useCallback((linkId: number) => {
    updateModal('DELETE', 'DELETE', linkId);
  }, []);
  const closeModal = useCallback(() => {
    updateModal('CLOSE');
  }, []);
  const value = useMemo(
    () => ({
      state,
      modifyModal,
      deleteModal,
      closeModal,
    }),
    [closeModal, deleteModal, modifyModal, state],
  );
  return (
    <ModalStoreContext.Provider value={value}>
      {children}
    </ModalStoreContext.Provider>
  );
};
