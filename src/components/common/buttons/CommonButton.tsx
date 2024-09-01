import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';
import { match } from 'ts-pattern';

type ButtonMode = 'default' | 'submit' | 'link';

interface CommonButtonProps extends ComponentPropsWithoutRef<'button'> {
  mode: ButtonMode;
  href?: string;
}

type TsButtonMode = { type: 'default' } | { type: 'submit' } | { type: 'link' };

const CommonButton = ({
  mode,
  children,
  className,
  onClick,
  href,
  ...rest
}: CommonButtonProps) => {
  const defaultButtonClassName =
    'flex w-full py-4 px-5 justify-center items-center gap-2.5 bg-gradient-color rounded-lg text-white disabled:bg-none disabled:bg-gray-500';
  const TsButton: TsButtonMode = { type: mode };
  const CButton = match(TsButton)
    .with({ type: 'default' }, () => (
      <button
        type="button"
        className={className ?? defaultButtonClassName}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    ))
    .with({ type: 'submit' }, () => (
      <button
        type="submit"
        className={className ?? defaultButtonClassName}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    ))
    .with({ type: 'link' }, () => (
      <Link href={href ?? ''} className={className}>
        {children}
      </Link>
    ))
    .exhaustive();
  return CButton;
};

export default CommonButton;
