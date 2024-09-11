import Image from 'next/image';
import kebabIcon from '@/assets/icons/ic_kebab.svg';
import { TLinkDto } from '@/lib/react-query';
import { useDropBoxStore } from '@/lib/hooks/links-component';
import DropBox from '../link-dropbox';
import { TDropBoxOpen, useModalStore } from '../../providers';

export const DropBoxComponent = ({ id }: Pick<TLinkDto, 'id'>) => {
  const { state, open: dropBoxOpen, close: dropBoxClose } = useDropBoxStore();
  const { modifyModal, deleteModal } = useModalStore();
  const currentItem = state.opens.find((item: TDropBoxOpen) => item.id === id);
  const handleClick = () => dropBoxOpen({ id, open: true });
  return (
    <DropBox.Root>
      <DropBox.Button onClick={handleClick}>
        <Image src={kebabIcon} alt="..." width={21} height={17} />
      </DropBox.Button>
      <DropBox.Menu isOpen={currentItem?.open}>
        <DropBox.Option
          value="수정하기"
          onClick={() => {
            dropBoxClose();
            modifyModal(id);
          }}
        />
        <DropBox.Option
          value="삭제하기"
          onClick={() => {
            dropBoxClose();
            deleteModal(id);
          }}
        />
      </DropBox.Menu>
    </DropBox.Root>
  );
};
