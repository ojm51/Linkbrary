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
    <footer className="w-full h-40 pt-8 bg-black">
      <div className="flex flex-wrap justify-between items-center w-full px-[1.875rem] md:px-5 mx-auto md:max-w-[109.375rem] md:flex-nowrap">
        <p className="order-3 mt-[3.75rem] w-full text-[#676767] md:max-w-[7.5rem] md:mt-0 md:order-1">
          ©codeit - 2023
        </p>
        <div className="flex justify-start items-center gap-[1.875rem] w-[50%] md:w-auto md:order-2">
          <Link href="/privacy" className="text-[#cfcfcf]">
            Privacy Policy
          </Link>
          <Link href="/faq" className="text-[#cfcfcf]">
            FAQ
          </Link>
        </div>
        <ul className="flex justify-end items-center gap-3 w-full max-w-[50%] md:max-w-[7.5rem] md:order-3">
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
