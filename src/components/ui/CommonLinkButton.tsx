import React from 'react';
import Link from 'next/link';

type CommonLinkButtonProps = {
  width: number;
  height: number;
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
      className="bg-gradient-color flex items-center justify-center rounded-[8px] text-lg text-white"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {children}
    </Link>
  );
};

export default CommonLinkButton;
