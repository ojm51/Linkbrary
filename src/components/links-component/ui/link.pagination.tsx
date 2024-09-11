import { getPagination, getTotalPages } from "@/lib/utils/links";
import { useLinksContextSelector } from "../providers";
import { useEffect, useRef } from "react";
import { PageArrow } from "./link-pagenation/page.arrow";
import { PageNumber } from "./link-pagenation/page.number";

export const LinkPagination = () => {
  const ulRef = useRef<HTMLUListElement>(null);
  const { linksAction, linksQueryAction, clientSizeAction } =
    useLinksContextSelector();

  const { width } = clientSizeAction.data || {};
  const { totalCount } = linksAction.data?.data || {};
  const { page, pageSize } = linksQueryAction?.data || {};
  const totalPages = getTotalPages(totalCount, pageSize);
  const allPages = getPagination(page, pageSize, totalPages, width);

  useEffect(() => {
    const currentUlRef = ulRef.current;
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof HTMLButtonElement) {
        const { id } = target;
        if (id.startsWith('page-')) {
          event.stopPropagation();
          const clickedPageId = id.slice(id.indexOf('-') + 1);
          linksQueryAction.updator({ page: Number(clickedPageId) });
        }
      }
    };
    currentUlRef?.addEventListener('click', handleClick);
    return () => {
      currentUlRef?.removeEventListener('click', handleClick);
    };
  }, [linksQueryAction]);

  return (
    <section className="p-8">
      <ul className="flex justify-center gap-x-2" ref={ulRef}>
        {page && (
          <li>
            <PageArrow
              direction="left"
              page={page - 1}
              isDisabled={page <= 1}
            />
          </li>
        )}
        {allPages?.map((val, index) => {
          let position: 'first' | 'last' | 'single' | 'middle' | undefined;
          if (index === 0) position = 'first';
          if (index === allPages.length - 1) position = 'last';
          if (allPages.length === 1) position = 'single';
          if (val === '...') position = 'middle';
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <PageNumber
                page={val}
                position={position}
                isActive={page === val}
              />
            </li>
          );
        })}
        {page && totalPages && (
          <li>
            <PageArrow
              direction="right"
              page={page + 1}
              isDisabled={page >= totalPages}
            />
          </li>
        )}
      </ul>
    </section>
  );
};