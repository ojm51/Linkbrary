import { match } from "ts-pattern";
import { LinkCardsSkeleton, LinkPaginationSkeleton } from "./skeletons";
import { LinkCards } from "./link-card/link-cards";
import { LinkPagination } from "./link.pagination";
import { useLinksContextSelector } from "../providers";

export const LinkComponent = () => {
  const { folderAction, linksAction } = useLinksContextSelector();
  const isLoading = folderAction.isLoading || linksAction.isLoading;
  const isError = folderAction.isError || linksAction.isError;
  return match({ isLoading, isError })
    .with({ isLoading: true }, () => (
      <>
        <LinkCardsSkeleton />
        <LinkPaginationSkeleton />
      </>
    ))
    .with({ isLoading: false, isError: true }, () => (
      <section>
        <div>
          데이터가 존재하지 않거나, 불러오는 데 실패했습니다. 다시 시도 해
          주세요.
        </div>
      </section>
    ))
    .otherwise(() => (
      <>
        <LinkCards />
        <LinkPagination />
      </>
    ));
};