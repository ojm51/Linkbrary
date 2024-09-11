import Image from 'next/image';
import searchIcon from '@/assets/icons/ic_search.svg';
import closeIcon from '@/assets/images/close.png';

type HandlerSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => void;

interface SearchBarProps {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setSearchResult: React.Dispatch<React.SetStateAction<string>>;
  handlerSearchSubmit: HandlerSearchSubmit;
}

export const SearchBar = ({
  searchValue,
  setSearchValue,
  setSearchResult,
  handlerSearchSubmit,
}: SearchBarProps) => {
  const handlerSearchDelete = () => {
    setSearchValue('');
    setSearchResult('');
  };

  return (
    <div className="m-auto max-w-[1060px] h-auto px-4 py-[15px] flex justify-between items-center rounded-[10px] bg-[#f5f5f5]">
      <form className="w-full" onSubmit={handlerSearchSubmit}>
        <div className="w-full flex justify-center items-center gap-3">
          <Image src={searchIcon} alt="검색 아이콘" width={16} height={16} />
          <input
            className="w-full focus:outline-none bg-[#f5f5f5] placeholder-[#666666] font-[Pretendard] not-italic leading-[24px]"
            type="text"
            placeholder="링크를 검색해 보세요"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </div>
      </form>
      {searchValue && (
        <button type="button" onClick={handlerSearchDelete}>
          <Image src={closeIcon} alt="삭제 아이콘" width={24} height={24} />
        </button>
      )}
    </div>
  );
};
