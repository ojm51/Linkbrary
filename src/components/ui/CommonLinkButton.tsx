import React from 'react';
import Link from 'next/link';

type CommonLinkButtonProps = {
  width: string;
  height: string;
  href: string;
  children: string;
};

const CommonLinkButton = ({
  width,
  height,
  href,
  children,
}: CommonLinkButtonProps) => {
  return (
    <Link
      href={href}
      type="button"
      className={`bg-gradient-color flex items-center justify-center w-[${width}] h-[${height}] rounded-[8px] text-lg text-white`}
    >
      {children}
    </Link>
  );
};

export default CommonLinkButton;
