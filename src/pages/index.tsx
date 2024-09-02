import CommonLinkButton from '@/components/ui/CommonLinkButton';
import Image from 'next/image';
import KeyVisualImage from '@/assets/images/landingKeyvisual.png';
import CardImage1_1 from '@/assets/images/landingCard1-1.png';
import CardImage1_2 from '@/assets/images/landingCard1-2.png';
import CardImage1_3 from '@/assets/images/landingCard1-3.png';
import CardImage2 from '@/assets/images/landingCard2.png';
import CardImage3_1 from '@/assets/images/landingCard3-1.png';
import CardImage3_2 from '@/assets/images/landingCard3-2.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const LINK_ADD_STYLE = {
    width: 350,
    height: 53,
    href: '/link',
  };

  return (
    <main>
      <section className="flex flex-col justify-center items-center bg-bg pt-[70px] mb-[70px] overflow-hidden">
        <h2
          className="font-bold text-[64px] text-center mb-[40px]"
          data-aos="zoom-out-up"
          data-aos-duration="2000"
        >
          <span className="bg-gradient-text-color text-transparent bg-clip-text">
            세상의 모든 정보
          </span>
          를<br />
          쉽게 저장하고 관리해 보세요
        </h2>
        <div
          className="mb-[40px]"
          data-aos="zoom-out-up"
          data-aos-duration="2000"
          data-aos-delay="500"
        >
          <CommonLinkButton
            width={LINK_ADD_STYLE.width}
            height={LINK_ADD_STYLE.height}
            href={LINK_ADD_STYLE.href}
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
          data-aos-duration="2000"
          data-aos-delay="1000"
        />
      </section>

      <section className="py-[50px]">
        <div className="w-full max-w-[998px] mx-auto flex justify-between items-center gap-[157px]">
          <div
            data-aos="fade-right"
            data-aos-duration="2000"
            data-aos-anchor-placement="top-bottom"
          >
            <h3 className="text-[48px]">
              원하는 링크를
              <br /> 저장하세요
            </h3>
            <p>
              나중에 읽고 싶은 글, 다시 보고 싶은 영상,
              <br /> 사고 싶은 옷, 기억하고 싶은 모든 것을
              <br /> 한 공간에 저장하세요.
            </p>
          </div>
          <div
            className="flex justify-center items-center w-[550px] h-[450px] bg-bg rounded-[15px] overflow-hidden"
            data-aos="fade-left"
            data-aos-duration="2000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="500"
          >
            <ul className="flex justify-center items-center gap-[20px] min-w-[772px]">
              <li>
                <Image
                  width={244}
                  height={239}
                  src={CardImage1_1}
                  alt="원하는 링크를 저장하세요 카드 이미지1"
                />
              </li>
              <li>
                <Image
                  width={244}
                  height={239}
                  src={CardImage1_2}
                  alt="원하는 링크를 저장하세요 카드 이미지2"
                />
              </li>
              <li>
                <Image
                  width={244}
                  height={239}
                  src={CardImage1_3}
                  alt="원하는 링크를 저장하세요 카드 이미지3"
                />
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-[50px]">
        <div className="w-full max-w-[998px] mx-auto flex justify-between items-center gap-[157px]">
          <div
            className="flex justify-center items-center w-[550px] h-[450px] bg-bg rounded-[15px] overflow-hidden"
            data-aos="fade-right"
            data-aos-duration="2000"
            data-aos-anchor-placement="top-bottom"
          >
            <Image
              className="card-animate1"
              width={414}
              height={270}
              src={CardImage2}
              alt="폴더 이름 변경하기 모달 이미지"
            />
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="2000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="500"
          >
            <h3 className="text-[48px]">
              링크를 폴더로
              <br />
              관리하세요
            </h3>
            <p>
              나만의 폴더를 무제한으로 만들고
              <br />
              다양하게 활용할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      <section className="py-[50px]">
        <div className="w-full max-w-[998px] mx-auto flex justify-between items-center gap-[157px]">
          <div
            data-aos="fade-left"
            data-aos-duration="2000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="500"
          >
            <h3 className="text-[48px]">
              저장한 링크를
              <br />
              공유해 보세요.
            </h3>
            <p>
              여러 링크를 폴더에 담고 공유할 수 있습니다.
              <br /> 가족, 친구, 동료들에게 쉽고 빠르게 링크를
              <br /> 공유해 보세요.
            </p>
          </div>
          <div
            className="flex justify-center items-center w-[550px] h-[450px] bg-bg rounded-[15px] overflow-hidden"
            data-aos="fade-right"
            data-aos-duration="2000"
            data-aos-anchor-placement="top-bottom"
          >
            <Image
              className="card-animate1"
              width={414}
              height={270}
              src={CardImage3_2}
              alt="폴더 이름 변경하기 모달 이미지"
            />
          </div>
        </div>
      </section>

      <section className="py-[50px]">
        <div className="w-full max-w-[998px] mx-auto flex justify-between items-center gap-[157px]">
          <div
            className="flex justify-center items-center w-[550px] h-[450px] bg-bg rounded-[15px] overflow-hidden"
            data-aos="fade-right"
            data-aos-duration="2000"
            data-aos-anchor-placement="top-bottom"
          >
            <Image
              className="card-animate1"
              width={414}
              height={270}
              src={CardImage3_2}
              alt="폴더 이름 변경하기 모달 이미지"
            />
          </div>
          <div
            data-aos="fade-left"
            data-aos-duration="2000"
            data-aos-anchor-placement="top-bottom"
            data-aos-delay="500"
          >
            <h3 className="text-[48px]">
              저장한 링크를
              <br />
              검색해 보세요.
            </h3>
            <p>중요한 정보들을 검색으로 쉽게 찾아보세요.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
