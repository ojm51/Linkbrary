import { CommonButton } from '@/components';

const Custom404 = () => {
  return (
    <div className="w-full h-screen bg-gradient-color p-5 md:p-14">
      <div className="w-full h-full px-5 bg-bg flex flex-col justify-center items-center">
        <h2 className="drop-shadow-[3px_3px_3px_rgba(0,0,0,0.5)] font-bold bg-gradient-text-blue-to-pink text-transparent bg-clip-text text-9xl mb-7 md:mb-7 md:text-[300px]">
          404
        </h2>
        <p className="text-lg mb-10 leading-8 text-center break-keep md:text-2xl md:leading-9 md:mb-10">
          죄송합니다. 페이지를 찾을 수 없습니다.
          <br /> 존재하지 않는 주소를 입력하셨거나, <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </p>
        <CommonButton
          mode="link"
          href="/"
          className="px-10 py-1 text-xl rounded-[11px] text-center leading-10 text-white bg-gradient-color md:px-20 md:py-4 md:text-3xl"
        >
          메인으로 가기
        </CommonButton>
      </div>
    </div>
  );
};

export default Custom404;
