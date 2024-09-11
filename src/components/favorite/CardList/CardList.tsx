import React, { useState, useMemo, useEffect } from 'react';
import { getFavoriteLinkList, FavoriteLinkTypes } from '@/lib/api';
import Card from './Card';

const CardsPerPageDesktop = 9; // 데스크톱에서 한 페이지당 카드 수 (3x3)
const CardsPerPageTablet = 6; // 태블릿에서 한 페이지당 카드 수 (2x3)
const CardsPerPageMobile = 9; // 모바일에서 한 페이지당 카드 수 (1x9)

const CardListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(CardsPerPageDesktop);
  const [favoriteCards, setFavoriteCards] = useState<FavoriteLinkTypes[]>([]); // API에서 불러온 데이터 저장

  // API에서 데이터를 불러오는 useEffect
  useEffect(() => {
    const fetchFavoriteCards = async () => {
      try {
        const data = await getFavoriteLinkList(); // API 호출
        setFavoriteCards(data.list); // 받아온 데이터를 상태에 저장
      } catch (error) {
        console.error('Failed to fetch favorite cards:', error);
      }
    };

    fetchFavoriteCards();
  }, []);

  // 화면 크기에 따른 페이지당 카드 수 설정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerPage(CardsPerPageDesktop);
      } else if (window.innerWidth >= 768) {
        setCardsPerPage(CardsPerPageTablet);
      } else {
        setCardsPerPage(CardsPerPageMobile);
      }
    };
    window.addEventListener('resize', handleResize);

    handleResize(); // 초기 실행

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 현재 페이지에 표시할 카드 리스트 계산
  const cardsToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    return favoriteCards.slice(startIndex, endIndex); // API에서 불러온 카드 사용
  }, [currentPage, cardsPerPage, favoriteCards]);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(favoriteCards.length / cardsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pt-1 px-4 sm:px-8 lg:px-[150px]">
      {/* Card Grid */}
      <div
        className={`grid gap-5 ${cardsPerPage === CardsPerPageMobile ? 'grid-cols-1' : 'md:grid-cols-2'} ${cardsPerPage === CardsPerPageDesktop ? 'lg:grid-cols-3' : ''}`}
      >
        {cardsToDisplay.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 pt-[30px] pb-[70px]">
        {/* Previous Page Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-[20px] py-[20px] mx-1 rounded flex items-center justify-center ${currentPage === 1 ? 'bg-[#F7F7F7] text-gray-400' : 'bg-[#F7F7F7] text-gray-700'}`}
          aria-label="Previous Page"
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 1L1 7L7 13"
              stroke={currentPage === 1 ? '#ABABAB' : '#1F1F1F'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-[20px] py-[20px] mx-[2px] rounded bg-[#F7F7F7] ${currentPage === index + 1 ? 'text-[#1F1F1F]' : 'text-[#C4C4C4]'} font-pretendard text-2lg font-semibold leading-26`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Page Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-[20px] py-[20px] mx-1 rounded flex items-center justify-center ${currentPage === totalPages ? 'bg-[#F7F7F7] text-gray-400' : 'bg-[#F7F7F7] text-gray-700'}`}
          aria-label="Next Page"
        >
          <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L7 7L0.999999 13"
              stroke={currentPage === totalPages ? '#ABABAB' : '#1F1F1F'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CardListPage;
