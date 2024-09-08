// import { match } from 'ts-pattern';
// import { AddFolderProps } from '@/lib/api';
// import {
//   AddFolder,
//   ShareFolder,
//   ChangeFolderName,
//   DeleteFolder,
// } from './ModalContents';

// // 타입을 문자열이 아닌 모달 타입 그 자체로 지정
// type AddModal = {
//   mode: 'add';
//   getInputValue: AddFolderProps['getInputValue'];
//   handleAddFolder: AddFolderProps['handleAddFolder'];
// };
// type ShareModal = { mode: 'share' };
// type ChangeNameModal = { mode: 'changeName' };
// type DeleteModal = { mode: 'delete' };

// type ModalRendererProps = AddModal | ShareModal | ChangeNameModal | DeleteModal;

// // getInputValue는 없을수도 있으니 프롭스를 받을 때 구조분해할당 하지 않음
// export const ModalRenderer = (modalProps: ModalRendererProps) => {
//   const mode = modalProps.mode;

//   const SelectedModalContent = match(mode)
//     .with('add', () => {
//       const getInputValue = (modalProps as AddModal).getInputValue;
//       const handleAddFolder = (modalProps as AddModal).handleAddFolder;
//       return (
//         <AddFolder
//           getInputValue={getInputValue}
//           handleAddFolder={handleAddFolder}
//         />
//       );
//     })
//     .with('share', () => <ShareFolder />)
//     .with('changeName', () => <ChangeFolderName />)
//     .with('delete', () => <DeleteFolder />)
//     .exhaustive();

//   return SelectedModalContent;
// };

/* eslint-disable prefer-destructuring */
import { match } from 'ts-pattern';
import { AddFolderProps } from '@/lib/api';
import {
  AddFolder,
  ShareFolder,
  ChangeFolderName,
  DeleteFolder,
} from './ModalContents';

type AddModal = {
  mode: 'add';
  getInputValue: AddFolderProps['getInputValue'];
  handleAddFolder: AddFolderProps['handleAddFolder'];
};
type ShareModal = { mode: 'share' };
type ChangeNameModal = { mode: 'changeName' };
type DeleteModal = { mode: 'delete' };

type ModalRendererProps = AddModal | ShareModal | ChangeNameModal | DeleteModal;

// getInputValue는 없을수도 있으니 프롭스를 받을 때 구조분해할당 하지 않음
export const ModalRenderer = (modalProps: ModalRendererProps) => {
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
    .with('share', () => <ShareFolder />)
    .with('changeName', () => <ChangeFolderName />)
    .with('delete', () => <DeleteFolder />)
    .exhaustive();

  return SelectedModalContent;
};
