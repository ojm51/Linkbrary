import { useState } from 'react';
import { TopTitle } from '@/components/landingPage/index';

type FaqType = {
  id: number;
  f: string;
  q: string;
};

const FAQ_CONTENTS: FaqType[] = [
  {
    id: 1,
    f: '어떤 사이트 인가요?',
    q: '나만의 링크를 관리하는 사이트 입니다.',
  },
  { id: 2, f: '회원탈퇴 못하나요?', q: '회원탈퇴는 없습니다.' },
  { id: 3, f: '비밀번호 변경 못하나요?', q: '비밀번호 변경 못합니다.' },
  { id: 4, f: '질문 영역 입니다.', q: '답변 영역 입니다.' },
  { id: 5, f: '질문 영역 입니다.', q: '답변 영역 입니다.' },
  { id: 6, f: '질문 영역 입니다.', q: '답변 영역 입니다.' },
  { id: 7, f: '질문 영역 입니다.', q: '답변 영역 입니다.' },
  { id: 8, f: '질문 영역 입니다.', q: '답변 영역 입니다.' },
  { id: 9, f: '질문 영역 입니다.', q: '답변 영역 입니다.' },
  { id: 10, f: '질문 영역 입니다.', q: '답변 영역 입니다.' },
];

const Faq = () => {
  const [isFaqActive, setIsFaqActive] = useState<number | null>(null);

  const handleFaqToggle = (id: number) => {
    setIsFaqActive(isFaqActive === id ? null : id);
  };

  return (
    <>
      <TopTitle>🤔 FAQ</TopTitle>
      <section className="px-5 mb-[7.5rem]">
        <div className="w-full max-w-[66.25rem] mx-auto">
          <ul>
            {FAQ_CONTENTS.map((faq) => {
              return (
                <li key={faq.id} className="mb-5">
                  <button
                    type="button"
                    className={`relative flex justify-between items-center w-full min-h-[4.375rem] pl-[3.75rem] pr-5 text-base font-bold rounded-[11px] bg-white border-solid  border-2 cursor-pointer hover:text-primary hover:border-primary md:min-h-[80px] md:text-lg ${isFaqActive === faq.id ? 'text-primary border-primary' : 'border-gray-200'}`}
                    onClick={() => handleFaqToggle(faq.id)}
                  >
                    <i
                      className={`absolute top-[50%] translate-y-[-50%] left-5 text-xl font-medium md:text-[1.625rem] ${isFaqActive === faq.id && 'text-primary'}`}
                    >
                      Q
                    </i>
                    {faq.f}
                    <i className="text-lg">
                      {isFaqActive === faq.id ? '▲' : '▼'}
                    </i>
                  </button>
                  <p
                    className={`relative transition-all duration-500 ease-out overflow-hidden text-sm md:text-base ${isFaqActive === faq.id ? 'h-[9.625rem] md:h-[12.75rem]' : 'h-0'}`}
                  >
                    <i className="absolute top-5 left-[1.438rem] text-xl font-medium text-secondary-60 md:text-[1.625rem]">
                      A
                    </i>
                    <span className="block min-h-[9.375rem] rounded-[11px] border-gray-200 border-2 border-solid bg-gray-100 p-5 pl-[3.75rem] md:min-h-[12.5rem]">
                      {faq.q}
                    </span>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Faq;
