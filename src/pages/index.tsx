import { useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useLoginAccessibility } from '@/lib/hooks';
import DownloadIcon from '@/assets/icons/downloadIcon.svg';
import FolderNameImage from '@/assets/images/landingFolderName.png';
import FolderShareImage from '@/assets/images/landingFolderShare.png';
import KeyVisualImage from '@/assets/images/landingKeyvisual.png';
import LinkCardBackImage from '@/assets/images/landingLinkBackCard.png';
import LinkCardDogImage from '@/assets/images/landIngLinkDogCard.png';
import LinkCardImage from '@/assets/images/landingLinkCard.png';
import SearchCardImage from '@/assets/images/landingLinkSearch.png';
import Link from 'next/link';

const Home = () => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  const { isLoginAccessible } = useLoginAccessibility();

  return (
    <main>
      <section className="flex flex-col justify-center items-center bg-bg pt-[30px] mb-[10px] overflow-hidden md:pt-[70px] md:mb-[70px]">
        {/** @Todo tailwindcss 공통부분 변수로 수정 */}
        <div
          className="flex items-center justify-center"
          data-aos="zoom-out-up"
          data-aos-duration="1500"
        >
          <div className="h-[45px] overflow-hidden pt-[6px] md:h-[77px]">
            <ul className="flex flex-col gap-[15px] font-bold text-[32px] md:text-[64px] key-title-slide">
              <li className="bg-gradient-text-blue-to-pink text-transparent bg-clip-text">
                세상의 모든 정보
              </li>
              <li className="bg-gradient-text-blue-to-pink text-transparent bg-clip-text">
                우리의 모든 정보
              </li>
              <li className="bg-gradient-text-blue-to-pink text-transparent bg-clip-text">
                나만의 모든 정보
              </li>
            </ul>
          </div>
          <span className="font-bold text-[32px] ml-[5px] md:text-[64px]">
            를
          </span>
        </div>
        <p
          className="font-bold text-[32px] text-center mb-[24px] md:mb-[40px] leading-[1.2] md:text-[64px]"
          data-aos="zoom-out-up"
          data-aos-duration="1500"
        >
          쉽게 저장하고
          <br className="block lg:hidden" /> 관리해 보세요
        </p>
        <div
          className="mb-[24px] md:mb-[40px]"
          data-aos="zoom-out-up"
          data-aos-duration="1500"
          data-aos-delay="200"
        >
          <Link
            href={isLoginAccessible ? '/links' : '/login'}
            className="bg-gradient-color flex items-center justify-center rounded-[8px] text-white w-[200px] h-[37px] text-sm md:w-[350px] md:h-[53px] md:text-lg "
          >
            링크 추가하기
          </Link>
        </div>

        <Image
          className="w-full max-w-[302px] h-[178px] lg:max-w-[1119px] lg:h-[659p] md:max-w-[698px] md:h-auto"
          src={KeyVisualImage}
          alt="키비주얼 이미지"
          data-aos="zoom-out-up"
          data-aos-duration="1500"
          data-aos-delay="400"
        />
      </section>

      <section className="py-[40px] px-[20px] md:py-[50px]">
        <div className="w-full max-w-[998px] mx-auto flex flex-col justify-between items-center gap-[24px] md:flex-row lg:gap-[157px] md:gap-[50px]">
          <div>
            <h3
              className="title-common"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              <span className="bg-gradient-text-red-to-blue text-transparent bg-clip-text">
                원하는 링크
              </span>
              를
              <br className="hidden md:block" /> 저장하세요
            </h3>
            <p
              className="leading-[1.3] max-w-[325px] text-[15px] md:text-base md:max-w-fit"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="600"
            >
              나중에 읽고 싶은 글, 다시 보고 싶은 영상,
              <br className="hidden md:block" />
              사고 싶은 옷,
              <br className="block md:hidden" /> 기억하고 싶은 모든 것을
              <br className="hidden md:block" />한 공간에 저장하세요.
            </p>
          </div>
          <div
            className="relative flex justify-center items-center w-[325px] h-[265px] lg:w-[550px] lg:h-[450px] md:w-[385px] md:h-[315px] bg-bg rounded-[15px] overflow-hidden"
            data-aos="fade-left"
            data-aos-duration="1500"
            data-aos-delay="500"
          >
            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              autoplay={{
                delay: 0,
                disableOnInteraction: true,
                stopOnLastSlide: true,
              }}
              loop
              observer
              observeParents
              speed={3000}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay]}
            >
              <SwiperSlide>
                <Image
                  width={244}
                  height={239}
                  src={LinkCardImage}
                  alt="원하는 링크를 저장하세요 카드 이미지1"
                />
              </SwiperSlide>
              <SwiperSlide className="relative">
                <span className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-51%] w-[135px] h-[135px] border-2 border-solid border-primary rounded-[11px] lg:translate-x-[-55%] lg:w-[215px] lg:h-[214px] md:translate-x-[-50%] md:w-[160px] md:h-[160px]" />
                <Image
                  className="absolute bottom-0 right-0 w-[30px] h-[30px] lg:w-[46px] lg:h-[46px] lg:right-[20px] md:w-[38px] md:h-[38px]"
                  src={DownloadIcon}
                  alt="다운로드 아이콘"
                />
                <Image
                  width={244}
                  height={239}
                  src={LinkCardDogImage}
                  alt="원하는 링크를 저장하세요 카드 이미지2"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  width={244}
                  height={239}
                  src={LinkCardBackImage}
                  alt="원하는 링크를 저장하세요 카드 이미지3"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <section className="py-[40px] px-[20px] md:py-[70px]">
        <div className="w-full max-w-[998px] mx-auto flex flex-col justify-between items-center gap-[24px] lg:gap-[157px] md:flex-row md:gap-[50px]">
          <div
            className="flex justify-center items-center order-2 w-[325px] h-[265px] bg-bg rounded-[15px] overflow-hidden md:order-1 lg:w-[550px] lg:h-[450px] md:w-[385px] md:h-[315px]"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <Image
              className="card-rotate mt-[25px] w-[250px] lg:w-[414px] lg:h-[270px] md:w-[300px]"
              src={FolderNameImage}
              alt="폴더 이름 변경하기 모달 이미지"
            />
          </div>
          <div className="order-1 md:order-2">
            <h3
              className="title-common"
              data-aos="fade-left"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              링크를 폴더로&nbsp;
              <br className="hidden md:block" />
              <span className="bg-gradient-text-blue-to-yellow text-transparent bg-clip-text">
                관리
              </span>
              하세요
            </h3>
            <p
              className="leading-[1.3] max-w-[325px] text-[15px] md:text-base md:max-w-fit"
              data-aos="fade-left"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="600"
            >
              나만의 폴더를 무제한으로 만들고
              <br className="hidden md:block" />
              다양하게 활용할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="py-[40px] px-[20px] md:py-[70px]">
        <div className="w-full max-w-[998px] mx-auto flex flex-col justify-between items-center gap-[24px] md:flex-row lg:gap-[157px] md:gap-[50px]">
          <div className="max-w-[325px] md:max-w-fit">
            <h3
              className="title-common"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              저장한 링크를&nbsp;
              <br className="hidden md:block" />
              <span className="bg-gradient-text-blue-to-skyblue text-transparent bg-clip-text">
                공유
              </span>
              해 보세요.
            </h3>
            <p
              className="leading-[1.3] text-[15px] md:text-base"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="600"
            >
              여러 링크를 폴더에 담고 공유할 수 있습니다.
              <br className="hidden md:block" />
              가족, 친구, 동료들에게 쉽고 빠르게 링크를
              <br className="hidden md:block" />
              공유해 보세요.
            </p>
          </div>
          <div
            className="flex justify-center items-center w-[325px] h-[265px] bg-card-image bg-cover bg-no-repeat bg-center rounded-[15px] overflow-hidden lg:w-[550px] lg:h-[450px] md:w-[385px] md:h-[315px]"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            <Image
              className="card-rotate-delay w-[250px] mt-[25px] lg:w-[414px] lg:h-[270px] md:w-[300px]"
              src={FolderShareImage}
              alt="폴더 공유하기 모달 이미지"
            />
          </div>
        </div>
      </section>

      <section className="py-[40px] px-[20px] mb-[40px] md:py-[70px] md:mb-[120px]">
        <div className="w-full max-w-[998px] mx-auto flex flex-col justify-between items-center gap-[24px] md:flex-row lg:gap-[157px] md:gap-[50px]">
          <div
            className="flex justify-center items-center order-2 w-[325px] h-[265px] relative bg-bg rounded-[15px] overflow-hidden md:order-1 lg:w-[550px] lg:h-[450px] md:w-[385px] md:h-[315px]"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <Image
              className="card-scale absolute top-[30px] left-[35px] md:top-[55px] md:left-[60px]"
              src={SearchCardImage}
              alt="링크 검색하기 이미지"
            />
          </div>
          <div className="w-full order-1 md:order-2 max-w-[325px] md:max-w-fit">
            <h3
              className="title-common"
              data-aos="fade-left"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              저장한 링크를&nbsp;
              <br className="hidden md:block" />
              <span className="bg-gradient-text-skyblue-to-blue text-transparent bg-clip-text">
                검색
              </span>
              해 보세요.
            </h3>
            <p
              className="leading-[1.3] text-gray-600"
              data-aos="fade-left"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="600"
            >
              중요한 정보들을 검색으로 쉽게 찾아보세요.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
