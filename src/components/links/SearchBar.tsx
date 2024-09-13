import Image from 'next/image';
import searchIcon from '@/assets/icons/ic_search.svg';
import closeIcon from '@/assets/images/close.png';

export const SearchBar = () => {
  return (
    <div className="m-auto max-w-[66.25rem] h-auto px-4 py-[0.9375rem] flex justify-between items-center rounded-[10px] bg-[#f5f5f5]">
      <div className="w-full flex justify-center items-center gap-3">
        <Image src={searchIcon} alt="검색 아이콘" width={16} height={16} />
        <input
          className="w-full focus:outline-none bg-[#f5f5f5] placeholder-[#666666] font-[Pretendard] not-italic leading-[1.5rem]"
          type="text"
          placeholder="링크를 검색해 보세요"
        />
      </div>
      <button type="button">
        <Image src={closeIcon} alt="삭제 아이콘" width={24} height={24} />
      </button>
    </div>
  );
};
