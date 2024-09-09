import React, { useState, useMemo, useEffect } from 'react';
import Card from './Card';

// Assuming `CardList` is imported from a data source or defined in the same file
const CardList = [
  {
    id: 1,
    favorite: false,
    url: 'naver.com',
    title: '네이버',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 2,
    favorite: true,
    url: 'naver.com',
    title:
      '국회는 국민의 보통·평등·직접·비밀선거에 의하여 선출된 국회의원으로 구성한다. 이 헌법시행 당시에 이 헌법에 의하여 새로 설치될 기관의 권한에 속하는 직무를 행하고 있는 기관은 이 헌법에 의하여 새로운 기관이 설치될 때까지 존속하며 그 직무를 행한다.',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 3,
    favorite: true,
    url: 'naver.com',
    title: '네이버3',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 4,
    favorite: true,
    url: 'naver.com',
    title: '네이버4',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 5,
    favorite: true,
    url: 'naver.com',
    title: '네이버5',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 6,
    favorite: false,
    url: 'naver.com',
    title: '네이버6',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 7,
    favorite: true,
    url: 'naver.com',
    title: '네이버7',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 8,
    favorite: false,
    url: 'naver.com',
    title: '네이버8',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 9,
    favorite: true,
    url: 'naver.com',
    title: '네이버9',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 10,
    favorite: false,
    url: 'naver.com',
    title: '네이버10',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 11,
    favorite: true,
    url: 'naver.com',
    title: '네이버11',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 12,
    favorite: true,
    url: 'naver.com',
    title: '네이버12',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 13,
    favorite: true,
    url: 'naver.com',
    title: '네이버13',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 14,
    favorite: true,
    url: 'naver.com',
    title: '네이버14',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 15,
    favorite: true,
    url: 'naver.com',
    title: '네이버15',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 16,
    favorite: true,
    url: 'naver.com',
    title: '네이버16',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 17,
    favorite: true,
    url: 'naver.com',
    title: '네이버17',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
  {
    id: 18,
    favorite: true,
    url: 'naver.com',
    title: '네이버18',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
];

const CardsPerPageDesktop = 9; // 데스크톱에서 한 페이지당 카드 수 (3x3)
const CardsPerPageTablet = 6; // 테이블릿에서 한 페이지당 카드 수 (2x3)
const CardsPerPageMobile = 9; // 모바일에서 한 페이지당 카드 수 (1x9)

const CardListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(CardsPerPageDesktop);

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
    const favoriteCards = CardList.filter((card) => card.favorite);

    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    return favoriteCards.slice(startIndex, endIndex);
  }, [currentPage, cardsPerPage]);

  const totalPages = Math.ceil(
    CardList.filter((card) => card.favorite).length / cardsPerPage,
  );

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
