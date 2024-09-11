type PageArrowProps = {
  direction: 'left' | 'right';
  page: number;
  isDisabled: boolean;
};

const pageStyle =
  'relative box-content w-7 h-7 p-2 text-center rounded-lg bg-gray-200 text-lg leading-relaxed';
export const PageArrow = ({ direction, page, isDisabled }: PageArrowProps) => {
  const arrow = direction === 'left' ? '<' : '>';
  return isDisabled ? (
    <div className={`${pageStyle} bg-red-400 text-white font-semibold`}>
      {arrow}
    </div>
  ) : (
    <button
      id={`page-${page}`}
      className={`${pageStyle} bg-green-400 text-white font-semibold`}
      data-action="pagination"
    >
      {arrow}
    </button>
  );
};
