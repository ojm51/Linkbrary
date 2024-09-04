import React, { useState, useMemo } from 'react';
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
    title: '네이버2',
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

const CardsPerPage = 9; // Number of cards per page

const CardListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the cards to display based on the current page
  const cardsToDisplay = useMemo(() => {
    // Filter cards with favorite: true
    const favoriteCards = CardList.filter((card) => card.favorite);

    // Calculate start and end index for pagination
    const startIndex = (currentPage - 1) * CardsPerPage;
    const endIndex = startIndex + CardsPerPage;

    return favoriteCards.slice(startIndex, endIndex);
  }, [currentPage]);

  // Calculate the total number of pages based on the filtered cards
  const totalPages = Math.ceil(
    CardList.filter((card) => card.favorite).length / CardsPerPage,
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      {/* Card Grid */}
      <div className="grid grid-cols-3 gap-4">
        {cardsToDisplay.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CardListPage;
