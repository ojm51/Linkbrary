import { GetServerSidePropsContext } from 'next';
import { getFolderDetail, getLinkListForSSR, LinkTypes } from '@/lib/api';

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const sharedFolderId = parseInt(context.params?.id as string, 10);

  if (!sharedFolderId) {
    return {
      notFound: true,
    };
  }

  const linkList = await getLinkListForSSR({ folderId: sharedFolderId });
  const sharedFolderName = (await getFolderDetail({ folderId: sharedFolderId }))
    .name;

  return {
    props: {
      linkList,
      sharedFolderName,
    },
  };
};

interface SharedProps {
  linkList: LinkTypes[];
  sharedFolderName: string;
}

/** @TODO 상단바 로고만 있는 걸로 수정하기 */
const Shared = ({ linkList, sharedFolderName }: SharedProps) => {
  console.log(linkList); // 린트 오류 해결을 위한 임시 로그

  return (
    <div>
      <div className="bg-[#F0F6FF]">
        <h1 className="font-pretendard text-[2.5rem] font-semibold leading-[2.9831rem] text-center pb-10">
          공유된 &quot;{sharedFolderName}&quot; 폴더
        </h1>
      </div>
      <div className="p-4">링크..</div>
    </div>
  );
};

export default Shared;
