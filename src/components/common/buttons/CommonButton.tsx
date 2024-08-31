import { ComponentPropsWithoutRef } from 'react';
import { match } from 'ts-pattern';

type buttonMode = 'default' | 'submit' | 'link';

interface CommonButtonProps extends ComponentPropsWithoutRef<'button'> {
  mode: buttonMode;
}

type TsButtonMode = { type: 'default' } | { type: 'submit' } | { type: 'link' };

export const CommonButton = ({
  mode,
  children,
  className,
  onClick,
  ...rest
}: CommonButtonProps) => {
  const defaultButtonClassName =
    'flex w-full py-4 px-5 justify-center items-center gap-2.5 bg-gradient-color rounded-lg text-white';
  const TsButton: TsButtonMode = { type: mode };
  const CButton = match(TsButton)
    .with({ type: 'default' }, () => <></>)
    .with({ type: 'submit' }, () => (
      <button
        type="submit"
        className={`${defaultButtonClassName} ${className}`}
        onClick={onClick}
        {...rest}
      >
        {children}
      </button>
    ))
    .with({ type: 'link' }, () => <></>)
    .exhaustive();
  return <>{CButton}</>;
};
