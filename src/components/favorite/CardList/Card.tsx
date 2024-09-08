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
    createAt: string;
  };
}

const Card: React.FC<CardProps> = ({ card }) => (
  <div
    className="border rounded-lg overflow-hidden shadow-lg cursor-pointer"
    onClick={() => window.open(`https://${card.url}`, '_blank')}
  >
    <img
      src={card.imageSource}
      alt={card.title}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <p className="font-pretendard text-[13px] font-[400] leading-[15.51px] text-left text-gray-400 pb-2">
        {timeAgo(card.createAt)}
      </p>
      <h2 className="font-pretendard text-lg font-normal leading-6 text-left line-clamp-2">
        {card.title}
      </h2>

      <p className="font-pretendard text-[14px] font-[400] leading-[16.71px] text-left text-gray-500 pt-2">
        {new Date(card.createAt).toLocaleDateString()}
      </p>
    </div>
  </div>
);

export default Card;
