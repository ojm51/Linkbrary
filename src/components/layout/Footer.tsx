import Link from 'next/link';
import FacebookIcon from '@/assets/icons/facebookIcon.svg';
import TwitterIcon from '@/assets/icons/twitterIcon.svg';
import YoutubeIcon from '@/assets/icons/youtubeIcon.svg';
import InstagramIcon from '@/assets/icons/instagramIcon.svg';
import Image from 'next/image';

type SnsListType = {
  id: number;
  href: string;
  src: string;
  alt: string;
};

const Footer = () => {
  const SNS_LISTS: SnsListType[] = [
    {
      id: 1,
      href: '/',
      src: FacebookIcon,
      alt: '페이스북 아이콘',
    },
    {
      id: 2,
      href: '/',
      src: TwitterIcon,
      alt: '트위터 아이콘',
    },
    {
      id: 3,
      href: '/',
      src: YoutubeIcon,
      alt: '유튜브 아이콘',
    },
    {
      id: 4,
      href: '/',
      src: InstagramIcon,
      alt: '인스타그램 아이콘',
    },
  ];

  return (
    <footer className="w-full h-[160px] pt-[32px] bg-black">
      <div className="flex justify-between items-center w-full max-w-[1750px] px-[20px] mx-auto">
        <p className="w-full max-w-[120px] text-[#676767]">©codeit - 2023</p>
        <div className="flex justify-center items-center gap-[30px]">
          <Link href="/privacy" className="text-[#cfcfcf]">
            Privacy Policy
          </Link>
          <Link href="/faq" className="text-[#cfcfcf]">
            FAQ
          </Link>
        </div>
        <ul className="flex justify-center items-center gap-[12px] w-full max-w-[120px]">
          {SNS_LISTS.map((sns) => {
            return (
              <li key={sns.id}>
                <Link href={sns.href}>
                  <Image width={20} height={20} src={sns.src} alt={sns.alt} />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
