import { match } from 'ts-pattern';
import { AddFolderParams } from '@/lib/api/folder';
import {
  AddFolder,
  ShareFolder,
  ChangeFolderName,
  DeleteFolder,
} from './ModalContents';

// 타입을 문자열이 아닌 모달 타입 그 자체로 지정
type AddModal = {
  mode: 'add';
  getInputValue: AddFolderParams['getInputValue'];
  handleAddFolder: AddFolderParams['handleAddFolder'];
};
type ShareModal = { mode: 'share' };
type ChangeNameModal = { mode: 'changeName' };
type DeleteModal = { mode: 'delete' };

type ModalContentProps = AddModal | ShareModal | ChangeNameModal | DeleteModal;

// getInputValue는 없을수도 있으니 프롭스를 받을 때 구조분해할당 하지 않음
export const ModalContent = (modalProps: ModalContentProps) => {
  const mode = modalProps.mode;

  const SelectedModalContent = match(mode)
    .with('add', () => {
      const getInputValue = (modalProps as AddModal).getInputValue;
      const handleAddFolder = (modalProps as AddModal).handleAddFolder;
      return (
        <AddFolder
          getInputValue={getInputValue}
          handleAddFolder={handleAddFolder}
        />
      );
    })
    .with('changeName', () => <ShareFolder />)
    .with('delete', () => <ChangeFolderName />)
    .with('share', () => <DeleteFolder />)
    .exhaustive();

  return SelectedModalContent;
};
