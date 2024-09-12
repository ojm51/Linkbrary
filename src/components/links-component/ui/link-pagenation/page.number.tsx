type PageNumberProps = {
  position: 'first' | 'last' | 'single' | 'middle' | undefined;
  page: string | number;
  isActive: boolean;
};

const pageStyle =
  'relative box-content w-7 h-7 p-2 text-center rounded-lg bg-gray-200 text-lg leading-relaxed';
export const PageNumber = ({ page, position, isActive }: PageNumberProps) => {
  return isActive || position === 'middle' ? (
    <div className={`${pageStyle} font-semibold`}>{page}</div>
  ) : (
    <button id={`page-${page}`} className={`${pageStyle}`}>
      {page}
    </button>
  );
};
