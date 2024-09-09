/* eslint-disable prefer-destructuring */
import { match } from 'ts-pattern';
import {
  AddFolder,
  ShareFolder,
  ChangeFolderName,
  DeleteFolder,
} from './ModalContents';

type AddModal = {
  mode: 'add';
  getInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddButtonClick: () => void;
};
type ShareModal = { mode: 'share' };
type ChangeNameModal = {
  mode: 'changeName';
  getInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeButtonClick: () => void;
};
type DeleteModal = { mode: 'delete'; handleDeleteButtonClick: () => void };

type ModalRendererProps = AddModal | ShareModal | ChangeNameModal | DeleteModal;

// 모달별 프롭스가 달라 전달 받을 때 구조분해할당 하지 않음
export const ModalRenderer = (modalProps: ModalRendererProps) => {
  const mode = modalProps.mode;

  const SelectedModalContent = match(mode)
    .with('add', () => {
      const getInputValue = (modalProps as AddModal).getInputValue;
      const handleAddButtonClick = (modalProps as AddModal)
        .handleAddButtonClick;
      return (
        <AddFolder
          getInputValue={getInputValue}
          handleAddButtonClick={handleAddButtonClick}
        />
      );
    })
    .with('share', () => <ShareFolder />)
    .with('changeName', () => {
      const getInputValue = (modalProps as ChangeNameModal).getInputValue;
      const handleChangeButtonClick = (modalProps as ChangeNameModal)
        .handleChangeButtonClick;
      return (
        <ChangeFolderName
          getInputValue={getInputValue}
          handleChangeButtonClick={handleChangeButtonClick}
        />
      );
    })
    .with('delete', () => {
      const handleDeleteButtonClick = (modalProps as DeleteModal)
        .handleDeleteButtonClick;
      return <DeleteFolder handleDeleteButtonClick={handleDeleteButtonClick} />;
    })
    .exhaustive();

  return SelectedModalContent;
};
