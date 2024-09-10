import CardList from '@/components/favorite/CardList/CardList';

const Favorite = () => {
  return (
    <div>
      <div className="bg-[#F0F6FF]">
        <h1 className="font-pretendard text-[40px] font-semibold leading-[47.73px] text-center pb-10">
          ⭐️즐겨찾기
        </h1>
      </div>
      <div className="pt-[30px]">
        <CardList />
      </div>
    </div>
  );
};

export default Favorite;
