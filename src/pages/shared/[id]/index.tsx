// TODO: 파일 내에 있는 주석들 수정 예정
import { GetStaticPaths, GetStaticProps } from 'next';
// import { useContext } from 'react';
// import { FolderContext } from '@/lib/context';
import CardList from '@/components/favorite/CardList/CardList';
import { getFolderListForSSG, getLinkListForSSG } from '@/lib/api';

export const getStaticPaths: GetStaticPaths = async () => {
  const folderList = await getFolderListForSSG();

  const paths = folderList.map((folder) => ({
    params: { id: folder.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const folderId = parseInt(context.params?.id as string, 10);
  const linkList = await getLinkListForSSG({ folderId });

  return {
    props: {
      linkList,
    },
  };
};

// interface SharedProps {
//   linkList: LinkTypes[];
// }

// const Shared = ({ linkList }: SharedProps) => {
const Shared = () => {
  // const { selectedFolder } = useContext(FolderContext);

  return (
    <div>
      <div className="bg-[#F0F6FF]">
        <h1 className="font-pretendard text-[40px] font-semibold leading-[47.73px] text-center pb-10">
          {/* {selectedFolder.name} */}FOLDER
        </h1>
      </div>
      <div className="p-4">
        {/* TODO: 프롭스로 linkList 넘겨주기 */}
        <CardList />
      </div>
    </div>
  );
};

export default Shared;
