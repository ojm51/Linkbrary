import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { AuthContext } from '@/lib/context';
import DownloadIcon from '@/assets/icons/downloadIcon.svg';
import CommonLinkButton from '@/components/ui/CommonLinkButton';
import KeyVisualImage from '@/assets/images/landingKeyvisual.png';
import CardImage4 from '@/assets/images/landingCard4.png';
import CardImage3_2 from '@/assets/images/landingCard3-2.png';
import CardImage2 from '@/assets/images/landingCard2.png';
import CardImage1_1 from '@/assets/images/landingCard1-1.png';
import CardImage1_3 from '@/assets/images/landingCard1-3.png';
import CardImage1_2 from '@/assets/images/landingCard1-2.png';

const Home = () => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  const LINK_ADD_STYLE: {
    width: number;
    height: number;
    href: string;
  } = {
    width: 350,
    height: 53,
    href: '/links',
  };

  const { userInfo } = useContext(AuthContext);
  const [isLinkAccessible, setIsLinkAccessible] = useState<boolean>(false);

  useEffect(() => {
    if (userInfo) {
      setIsLinkAccessible(true);
    } else {
      setIsLinkAccessible(false);
    }
  }, [userInfo]);

  return (
    <main>
      <section className="flex flex-col justify-center items-center bg-bg pt-[70px] mb-[70px] overflow-hidden">
        <div
          className="flex items-center justify-center"
          data-aos="zoom-out-up"
          data-aos-duration="1500"
        >
          <div className="h-[77px] overflow-hidden pt-[6px]">
            <ul className="key-title-slide flex flex-col gap-[15px] font-bold text-[64px]">
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
          <span className="font-bold text-[64px] ml-[5px]">를</span>
        </div>
        <p
          className="font-bold text-[64px] text-center mb-[40px] leading-[1.2]"
          data-aos="zoom-out-up"
          data-aos-duration="1500"
        >
          쉽게 저장하고 관리해 보세요
        </p>
        <div
          className="mb-[40px]"
          data-aos="zoom-out-up"
          data-aos-duration="1500"
          data-aos-delay="200"
        >
          <CommonLinkButton
            width={LINK_ADD_STYLE.width}
            height={LINK_ADD_STYLE.height}
            href={isLinkAccessible ? LINK_ADD_STYLE.href : '/login'}
          >
            링크 추가하기
          </CommonLinkButton>
        </div>

        <Image
          width={1118}
          height={659}
          src={KeyVisualImage}
          alt="키비주얼 이미지"
          data-aos="zoom-out-up"
          data-aos-duration="1500"
          data-aos-delay="400"
        />
      </section>

      <section className="py-[50px]">
        <div className="w-full max-w-[998px] mx-auto flex justify-between items-center gap-[157px]">
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
              <br /> 저장하세요
            </h3>
            <p
              className="leading-[1.3]"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="600"
            >
              나중에 읽고 싶은 글, 다시 보고 싶은 영상,
              <br /> 사고 싶은 옷, 기억하고 싶은 모든 것을
              <br /> 한 공간에 저장하세요.
            </p>
          </div>
          <div
            className="relative flex justify-center items-center w-[550px] h-[450px] bg-bg rounded-[15px] overflow-hidden"
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
                  src={CardImage1_1}
                  alt="원하는 링크를 저장하세요 카드 이미지1"
                />
              </SwiperSlide>
              <SwiperSlide className="relative">
                <span className="absolute top-[50%] left-[50%] translate-x-[-55%] translate-y-[-51%] w-[215px] h-[214px] border-2 border-solid border-primary rounded-[11px]" />
                <Image
                  className="absolute bottom-0 right-[20px]"
                  width={46}
                  height={46}
                  src={DownloadIcon}
                  alt="다운로드 아이콘"
                />
                <Image
                  width={244}
                  height={239}
                  src={CardImage1_2}
                  alt="원하는 링크를 저장하세요 카드 이미지2"
                />
              </SwiperSlide>
              <SwiperSlide>
                <Image
                  width={244}
                  height={239}
                  src={CardImage1_3}
                  alt="원하는 링크를 저장하세요 카드 이미지3"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      <section className="py-[70px]">
        <div className="w-full max-w-[998px] mx-auto flex justify-between items-center gap-[157px]">
          <div
            className="flex justify-center items-center w-[550px] h-[450px] bg-bg rounded-[15px] overflow-hidden"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <Image
              className="card-rotate"
              width={414}
              height={270}
              src={CardImage2}
              alt="폴더 이름 변경하기 모달 이미지"
            />
          </div>
          <div>
            <h3
              className="title-common"
              data-aos="fade-left"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              링크를 폴더로
              <br />
              <span className="bg-gradient-text-blue-to-yellow text-transparent bg-clip-text">
                관리
              </span>
              하세요
            </h3>
            <p
              className="leading-[1.3]"
              data-aos="fade-left"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="600"
            >
              나만의 폴더를 무제한으로 만들고
              <br />
              다양하게 활용할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="py-[70px]">
        <div className="w-full max-w-[998px] mx-auto flex justify-between items-center gap-[157px]">
          <div>
            <h3
              className="title-common"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              저장한 링크를
              <br />
              <span className="bg-gradient-text-blue-to-skyblue text-transparent bg-clip-text">
                공유
              </span>
              해 보세요.
            </h3>
            <p
              className="leading-[1.3]"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="600"
            >
              여러 링크를 폴더에 담고 공유할 수 있습니다.
              <br /> 가족, 친구, 동료들에게 쉽고 빠르게 링크를
              <br /> 공유해 보세요.
            </p>
          </div>
          <div
            className="flex justify-center items-center w-[550px] h-[450px] bg-card-image bg-cover bg-no-repeat bg-center rounded-[15px] overflow-hidden"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            <Image
              className="card-rotate-delay"
              width={414}
              height={270}
              src={CardImage3_2}
              alt="폴더 이름 변경하기 모달 이미지"
            />
          </div>
        </div>
      </section>

      <section className="py-[70px] mb-[120px]">
        <div className="w-full max-w-[998px] mx-auto flex justify-between items-center gap-[157px]">
          <div
            className="flex justify-center items-center relative w-[550px] h-[450px] bg-bg rounded-[15px] overflow-hidden"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <Image
              className="absolute top-[55px] left-[60px] scale-[0.9] card-scale"
              width={619}
              height={584}
              src={CardImage4}
              alt="폴더 이름 변경하기 모달 이미지"
            />
          </div>
          <div>
            <h3
              className="title-common"
              data-aos="fade-left"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1500"
              data-aos-delay="500"
            >
              저장한 링크를
              <br />
              <span className="bg-gradient-text-skyblue-to-blue text-transparent bg-clip-text">
                검색
              </span>
              해 보세요.
            </h3>
            <p
              className="leading-[1.5]"
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
