import React from 'react';

const SkeletonCard: React.FC = () => {
  const shimmerClass =
    'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div className={`w-full rounded-lg h-48 bg-gray-300 ${shimmerClass}`} />
      <div className="p-4">
        <div
          className={`w-1/3 rounded-lg h-4 bg-gray-300 mb-2 ${shimmerClass}`}
        />
        <div
          className={`w-2/3 rounded-lg h-6 bg-gray-300 mb-2 ${shimmerClass}`}
        />
        <div className={`w-1/2 rounded-lg h-4 bg-gray-300 ${shimmerClass}`} />
      </div>
    </div>
  );
};

export default SkeletonCard;
