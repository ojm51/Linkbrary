import { match } from 'ts-pattern';
import { LinkCardsSkeleton, LinkPaginationSkeleton } from './skeletons';
import { LinkPagination } from './link.pagination';
import { useLinksContextSelector } from '../providers';
import { LinkCards } from './link-card';

export const LinkComponent = () => {
  const { folderAction, linksAction } = useLinksContextSelector();
  const isLoading = folderAction.isLoading || linksAction.isLoading;
  const isError = folderAction.isError || linksAction.isError;
  const zeroLength = linksAction.data?.data.list.length === 0;
  return match({ zeroLength, isLoading, isError })
    .with({ isLoading: true }, () => (
      <>
        <LinkCardsSkeleton />
        <LinkPaginationSkeleton />
      </>
    ))
    .with({ isLoading: false, isError: true }, () => (
      <section className="p-8 flex justify-center">
        <h1 className="text-2xl">
          데이터를 불러오는 데 실패했습니다. 다시 시도 해 주세요.
        </h1>
      </section>
    ))
    .with({ zeroLength: true }, () => (
      <section className="p-8 flex justify-center">
        <h1 className="text-2xl">
          데이터가 존재하지 않습니다. 링크를 추가 해 주세요.
        </h1>
      </section>
    ))
    .otherwise(() => (
      <>
        <LinkCards />
        <LinkPagination />
      </>
    ));
};
