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
      <p className="text-gray-400">{timeAgo(card.createAt)}</p>
      <h2 className="text-xl font-bold">{card.title}</h2>
      <p className="text-gray-500">
        {new Date(card.createAt).toLocaleDateString()}
      </p>
    </div>
  </div>
);

export default Card;
