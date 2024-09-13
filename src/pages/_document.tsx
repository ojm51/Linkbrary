import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html lang="ko">
      <Head />
      <script defer src="https://developers.kakao.com/sdk/js/kakao.min.js" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
