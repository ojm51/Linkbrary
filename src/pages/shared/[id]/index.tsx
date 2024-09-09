import { GetStaticPaths, GetStaticProps } from 'next';
import CardList from '@/components/favorite/CardList/CardList';
import {
  getFolder,
  getFolderListForSSG,
  getLinkListForSSG,
  LinkTypes,
} from '@/lib/api';

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
      folderId,
    },
  };
};

interface SharedProps {
  linkList: LinkTypes[];
  folderId: number;
}

const Shared = async ({ linkList, folderId }: SharedProps) => {
  const sharedFolderName = (await getFolder({ folderId })).name;
  console.log(linkList);

  return (
    <div>
      <div className="bg-[#F0F6FF]">
        <h1 className="font-pretendard text-[40px] font-semibold leading-[47.73px] text-center pb-10">
          {sharedFolderName}
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
