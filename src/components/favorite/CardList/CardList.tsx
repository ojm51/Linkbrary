import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';

const allCardList = [
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
    id: 12,
    favorite: true,
    url: 'naver.com',
    title: '네이버12',
    imageSource:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FCNxUY%2Fbtqw7dnElRU%2FHuVZgvpT6J8n4aEYFathEk%2Fimg.jpg',
    description: '네이버에서 모든 것을 만나보세요.',
    createAt: '2024-08-30T07:56:21.621Z',
  },
];

const PAGE_SIZE = 9; // 페이지 당 로드할 카드 수

const CardList: React.FC = () => {
  const [cardList, setCardList] = useState<typeof allCardList>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCardElementRef = useRef<HTMLDivElement | null>(null);

  const loadMoreCards = () => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * PAGE_SIZE;
    const endIndex = nextPage * PAGE_SIZE;
    const nextCards = allCardList.slice(startIndex, endIndex);

    if (nextCards.length > 0) {
      setCardList((prevCards) => [...prevCards, ...nextCards]);
      setPage(nextPage);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadMoreCards();
  }, []);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMoreCards();
      }
    });

    if (lastCardElementRef.current) {
      observer.current.observe(lastCardElementRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore, page]);

  const favoriteCards = cardList.filter((card) => card.favorite);

  return (
    <div className="grid grid-cols-3 gap-4 p-8">
      {favoriteCards.map((card, index) => {
        if (index === favoriteCards.length - 1) {
          return (
            <div ref={lastCardElementRef} key={card.id}>
              <Card card={card} />
            </div>
          );
        }
        return <Card key={card.id} card={card} />;
      })}
    </div>
  );
};

export default CardList;
