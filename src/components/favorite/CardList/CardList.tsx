import React, { useState, useMemo, useEffect } from 'react';
import { getFavoriteLinkList, FavoriteLinkTypes } from '@/lib/api';
import Card from './Card';
import SkeletonCard from './SkeletonCard';

const CardsPerPageDesktop = 9;
const CardsPerPageTablet = 6;
const CardsPerPageMobile = 9;

const CardListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(CardsPerPageDesktop);
  const [favoriteCards, setFavoriteCards] = useState<FavoriteLinkTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<boolean>(false);

  useEffect(() => {
    const fetchFavoriteCards = async () => {
      try {
        const data = await getFavoriteLinkList();
        setFavoriteCards(data.list);
        setFetchError(false);
      } catch (error) {
        console.error('Failed to fetch favorite cards:', error);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteCards();
  }, []);

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

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardsToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    return favoriteCards.slice(startIndex, endIndex);
  }, [currentPage, cardsPerPage, favoriteCards]);

  const totalPages = Math.ceil(favoriteCards.length / cardsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className={`${getGridClassName()} pb-[100px]`}>
          {[...new Array(CardsPerPageDesktop)].map(() => (
            <SkeletonCard key={`skeleton-${Math.random()}`} />
          ))}
        </div>
      );
    }

    if (fetchError) {
      return (
        <div className="text-center py-10 text-gray-500">
          즐겨찾기한 링크를 불러오는 데 실패했습니다.
        </div>
      );
    }

    if (favoriteCards.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500">
          즐겨찾기한 링크가 없습니다.
        </div>
      );
    }

    return (
      <div className={`${getGridClassName()} pb-[100px]`}>
        {cardsToDisplay.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    );
  };

  const getGridClassName = () => {
    return `grid gap-5 ${
      cardsPerPage === CardsPerPageMobile ? 'grid-cols-1' : 'md:grid-cols-2'
    } ${cardsPerPage === CardsPerPageDesktop ? 'lg:grid-cols-3' : ''}`;
  };

  return (
    <div className="pt-1 px-4 sm:px-8 lg:px-[150px]">
      {renderContent()}

      {!loading && favoriteCards.length > 0 && (
        <div className="flex justify-center mt-4 pt-[30px] pb-[70px]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-[20px] py-[20px] mx-1 rounded flex items-center justify-center ${
              currentPage === 1
                ? 'bg-[#F7F7F7] text-gray-400'
                : 'bg-[#F7F7F7] text-gray-700'
            }`}
            aria-label="이전 페이지"
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

          {[...new Array(totalPages)].map((_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-[20px] py-[20px] mx-[2px] rounded bg-[#F7F7F7] ${
                  currentPage === pageNumber
                    ? 'text-[#1F1F1F]'
                    : 'text-[#C4C4C4]'
                } font-pretendard text-2lg font-semibold leading-26`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-[20px] py-[20px] mx-1 rounded flex items-center justify-center ${
              currentPage === totalPages
                ? 'bg-[#F7F7F7] text-gray-400'
                : 'bg-[#F7F7F7] text-gray-700'
            }`}
            aria-label="다음 페이지"
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
      )}
    </div>
  );
};

export default CardListPage;
