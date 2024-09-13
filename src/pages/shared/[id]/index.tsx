import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getFolderDetail, getLinkListForSSR, LinkTypes } from '@/lib/api';
import CardList from '@/components/favorite/CardList/CardList';
import HeaderLogoImage from '@/assets/images/headerLogo.png';

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

const Shared = ({ linkList, sharedFolderName }: SharedProps) => {
  return (
    <>
      <div className="bg-bg">
        <nav className="w-full flex justify-between items-center mx-auto max-w-[22.81rem] h-[3.75rem] px-[1.875rem] md:px-5 md:max-w-[52.5rem] md:h-[5.625rem] lg:max-w-[97.5rem] ">
          <Link href="/">
            <Image
              className="w-[5.563rem] h-4 md:w-[8.313rem] md:h-6"
              src={HeaderLogoImage}
              alt="linkbrary"
            />
          </Link>
        </nav>
        <header>
          <h1 className="font-[Pretendard] text-[1.5rem] font-semibold leading-[2.9831rem] text-center pb-10 md:text-[2.5rem]">
            공유된{' '}
            <span className="font-bold">&quot;{sharedFolderName}&quot;</span>{' '}
            폴더
          </h1>
        </header>
      </div>
      <main className="flex justify-center items-center p-4">
        <CardList isSharedPage linkList={linkList} />
      </main>
    </>
  );
};

export default Shared;
