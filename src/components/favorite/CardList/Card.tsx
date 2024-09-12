import React from 'react';
import { timeAgo } from './timeAgo';

interface CardProps {
  card: {
    id: number;
    favorite: boolean;
    url: string;
    title: string;
    imageSource: string;
    description: string;
    createdAt: string;
  };
}

const Card: React.FC<CardProps> = ({ card }) => {
  const defaultImage = '/images/NoImage.jpg';

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
      onClick={() => window.open(`https://${card.url}`, '_blank')}
    >
      <img
        src={card.imageSource || defaultImage}
        alt={card.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <p className="font-pretendard text-[13px] font-[400] leading-[15.51px] text-left text-gray-400 pb-2">
          {timeAgo(card.createdAt)}
        </p>
        <h2 className="font-pretendard text-lg font-normal leading-6 text-left line-clamp-2">
          {card.title}
        </h2>

        <p className="font-pretendard text-[14px] font-[400] leading-[16.71px] text-left text-gray-500 pt-2">
          {new Date(card.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Card;
