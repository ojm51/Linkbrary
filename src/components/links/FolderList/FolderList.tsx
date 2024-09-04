import { useEffect, useState } from 'react';
import Image from 'next/image';
import plusIcon from '@/assets/icons/ic_plus.svg';
import { CommonModal, ModalContent, Folder } from '@/components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AddFolderProps,
  FolderTypes,
  getFolderList,
  postAddFolder,
} from '@/lib/api';

export const FolderList = () => {
  const [folderName, setFolderName] = useState('');

  const [showModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setShowModal((prev) => !prev);
  const getInputValue: AddFolderProps['getInputValue'] = (e) => {
    setFolderName(e.target.value);
  };

  // const {
  //   data: folderList = [],
  //   isLoading,
  //   isError,
  // } = useQuery<FolderTypes[]>({
  //   queryKey: ['folderList'],
  //   queryFn: getFolderList,
  // });

  const [folderList, setFolderList] = useState<FolderTypes[]>([]);
  const fetchFolderList = async () => {
    const data = await getFolderList();
    setFolderList(data);
  };
  useEffect(() => {
    fetchFolderList();
  }, []);
  // const queryClient = useQueryClient();
  // const mutation = useMutation({ mutationFn: postAddFolder });

  const handleAddFolderButtonClick = async () => {
    // await postAddFolder({ folderName });
    // fetchFolderList();
    // // mutation.mutate({ folderName });
    // setShowModal((prev) => !prev);
    await postAddFolder({ folderName });
    fetchFolderList();
    setShowModal((prev) => !prev);
  };

  return (
    <div className="flex justify-between items-center">
      <ul className="flex justify-start items-center gap-2">
        {folderList.map((folder) => (
          <li key={folder.id}>
            <Folder folderName={folder.name} />
          </li>
        ))}
      </ul>

      <button
        className="flex justify-center items-center gap-1 font-medium text-primary text-base font-[Pretendard] not-italic leading-[normal]"
        onClick={handleCloseModal}
      >
        폴더 추가
        <Image src={plusIcon} alt="플러스 아이콘" width={16} height={16} />
      </button>
      {showModal && (
        <CommonModal closeModal={handleCloseModal}>
          <ModalContent
            mode="add"
            getInputValue={getInputValue}
            handleAddFolder={handleAddFolderButtonClick}
          />
        </CommonModal>
      )}
    </div>
  );
};
