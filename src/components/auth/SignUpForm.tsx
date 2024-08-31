import Image from 'next/image';
import { FieldValues, useForm } from 'react-hook-form';

import { usePasswordVisuality } from '@/lib';
import { CommonButton, CommonInputWithError } from '../common';

export const SignUpForm = () => {
  const {
    visible: passwordVisible,
    visibleIcon: passwordVisibleIcon,
    handleVisible: handlePasswordVisible,
  } = usePasswordVisuality();
  const {
    visible: passwordConfirmVisible,
    visibleIcon: passwordConfirmVisibleIcon,
    handleVisible: handlePasswordConfirmVisible,
  } = usePasswordVisuality();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = (values: FieldValues) => {
    console.log(values);
  };

  const formClassName =
    'w-full flex flex-col justify-center items-start gap-[12px]';
  const iconClassName = 'absolute top-6 right-4';
  return (
    <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
      <CommonInputWithError
        placeholder="link@brary.com"
        errorMessage={`${errors.email?.message}`}
        errorMessageVisible={!!errors.email}
        register={register('email', {
          required: '필수 항목입니다.',
          pattern: {
            value:
              /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
            message: '이메일 형식으로 작성해주세요.',
          },
        })}
      >
        이메일
      </CommonInputWithError>

      <CommonInputWithError
        placeholder="대/소문자, 숫자, 특수문자(!@#$%^&*) 포함 8자 이상"
        errorMessage={`${errors.password?.message}`}
        type={passwordVisible ? 'text' : 'password'}
        errorMessageVisible={!!errors.password}
        Icon={
          <Image
            className={iconClassName}
            src={passwordVisibleIcon}
            alt="비밀번호 보기"
            onClick={handlePasswordVisible}
          />
        }
        register={register('password', {
          required: '필수 항목입니다.',
          minLength: {
            value: 8,
            message: '8자 이상 입력해주세요.',
          },
          pattern: {
            value:
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$/i,
            message: '영문(대/소), 숫자, 특수문자(!@#$%^&*) 필수입니다.',
          },
        })}
      >
        비밀번호
      </CommonInputWithError>

      <CommonInputWithError
        placeholder="비밀번호를 다시 한 번 입력해주세요."
        errorMessage={`${errors.passwordConfirm?.message}`}
        type={passwordConfirmVisible ? 'text' : 'password'}
        errorMessageVisible={!!errors.passwordConfirm}
        Icon={
          <Image
            src={passwordConfirmVisibleIcon}
            className={iconClassName}
            alt="비밀번호 확인 보기"
            onClick={handlePasswordConfirmVisible}
          />
        }
        register={register('passwordConfirm', {
          required: '필수 항목입니다.',
          validate: (passwordConfirm: string) => {
            if (watch('password') !== passwordConfirm) {
              return '비밀번호가 일치하지 않습니다.';
            }
          },
        })}
      >
        비밀번호 확인
      </CommonInputWithError>

      <CommonButton mode="submit" disabled={!isValid}>
        회원가입
      </CommonButton>
    </form>
  );
};
