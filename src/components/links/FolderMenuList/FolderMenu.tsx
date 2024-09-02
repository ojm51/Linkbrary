import Image from 'next/image';

interface FolderMenuProps {
  src: string;
  text: string;
}

const FolderMenu = ({ src, text }: FolderMenuProps) => {
  return (
    <button className="flex justify-center items-center gap-1 text-[14px] font-semibold text-gray-60 font-[Pretendard] not-italic leading-[normal]">
      <Image src={src} alt={`${text} 아이콘`} width={18} height={18} />
      {text}
    </button>
  );
};

export default FolderMenu;
