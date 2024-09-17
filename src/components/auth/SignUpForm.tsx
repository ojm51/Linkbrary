import { AxiosError } from 'axios';
import Image from 'next/image';
import { ComponentType } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from 'react-hook-form';

import { useModal } from '@/lib/context';
import { usePasswordVisuality, useSignUp, useValidateEmail } from '@/lib/hooks';

import { CommonButton, CommonInputWithError } from '../common';
import { LoginFormProps, PasswordVisible } from './LoginForm';
import { LoadingProps, withLoading } from '@/lib/hoc';

type RHFPropertyType = {
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  errors: FieldErrors<FieldValues>;
  isValid: boolean;
};
interface SignUpProps extends LoginFormProps {
  passwordConfirmVisible: PasswordVisible;
  RHFProperty: RHFPropertyType;
}

export const SignUpFormComponent = ({
  passwordVisible,
  passwordConfirmVisible,
  RHFProperty,
  onSubmit,
}: SignUpProps) => {
  const { register, errors, isValid, handleSubmit } = RHFProperty;
  const formClassName =
    'w-full flex flex-col justify-center items-start gap-[12px]';
  const iconClassName = 'absolute top-6 right-4 cursor-pointer';
  return (
    <form className={formClassName} onSubmit={handleSubmit(onSubmit)}>
      <CommonInputWithError
        htmlfor="email"
        placeholder="link@brary.com"
        errorMessage={`${errors.email?.message}`}
        errorMessageVisible={!!errors.email}
        onBlur={() => {}}
        register={register('email', {
          required: '이메일을 입력해주세요.',
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
        htmlfor="name"
        placeholder="닉네임을 입력해주세요"
        errorMessage={`${errors.name?.message}`}
        errorMessageVisible={!!errors.name}
        register={register('name', {
          required: '닉네임을 입력해주세요',
          maxLength: { value: 10, message: '최대 10자까지 가능합니다.' },
          pattern: {
            value: /^[가-힣a-zA-Z0-9]*$/i,
            message: '한글, 영문, 숫자만 가능합니다.',
          },
        })}
      >
        이름
      </CommonInputWithError>
      <CommonInputWithError
        htmlfor="password"
        placeholder="대/소문자, 숫자, 특수문자(!@#$%^&*) 포함 8자 이상"
        errorMessage={`${errors.password?.message}`}
        type={passwordVisible.visible ? 'text' : 'password'}
        errorMessageVisible={!!errors.password}
        Icon={
          <Image
            className={iconClassName}
            src={passwordVisible.visibleIcon}
            alt="비밀번호 보기"
            onClick={passwordVisible.handleVisible}
          />
        }
        register={register('password', {
          required: '필수 항목입니다.',
          minLength: {
            value: 8,
            message: '8자 이상 입력해주세요.',
          },
          pattern: {
            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).*$/i,
            message: '영문(대/소), 숫자, 특수문자(!@#$%^&*)를 포함해주세요.',
          },
          deps: 'passwordConfirm',
        })}
      >
        비밀번호
      </CommonInputWithError>
      <CommonInputWithError
        htmlfor="passwordConfirm"
        placeholder="비밀번호를 다시 한 번 입력해주세요."
        errorMessage={`${errors.passwordConfirm?.message}`}
        type={passwordConfirmVisible.visible ? 'text' : 'password'}
        errorMessageVisible={!!errors.passwordConfirm}
        Icon={
          <Image
            src={passwordConfirmVisible.visibleIcon}
            className={iconClassName}
            alt="비밀번호 확인 보기"
            onClick={passwordConfirmVisible.handleVisible}
          />
        }
        register={register('passwordConfirm', {
          validate: (passwordConfirm: string, formValue) => {
            if (formValue.password !== passwordConfirm) {
              return '비밀번호가 일치하지 않습니다.';
            }
            return true;
          },
          deps: 'password',
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

type SignUpWithLoading = SignUpProps & LoadingProps;

const withSignUpHandler =
  (WrappedComponent: ComponentType<SignUpWithLoading>) => () => {
    const signUpMutate = useSignUp();
    const validateEmailMutate = useValidateEmail();
    const {
      register,
      handleSubmit,
      formState: { errors, isValid },
      setError,
    } = useForm({ mode: 'all' });
    const { openModal } = useModal();
    const passowrdVisible = usePasswordVisuality();
    const passwordConfirmVisible = usePasswordVisuality();

    const onSubmit = async (values: FieldValues) => {
      const { email, name, password } = values;
      try {
        const data = await validateEmailMutate.mutateAsync(email);
        if (data) {
          if (data.status === 200 && data.data?.isUsableEmail) {
            signUpMutate.mutate({ email, name, password });
          } else {
            setError('email', { message: '중복된 이메일입니다.' });
          }
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 409) {
            setError('email', { message: '중복된 이메일입니다.' });
            openModal({
              type: 'alert',
              key: 'emailValidateError',
              message: '중복된 이메일입니다.',
            });
            return;
          }
        }
        openModal({
          type: 'alert',
          key: 'emailValidateError',
          message: '알 수 없는 에러입니다. 계속되면 관리자에게 문의해주세요.',
        });
      }
    };
    const RHFProperty: RHFPropertyType = {
      register,
      errors,
      handleSubmit,
      isValid,
    };
    return (
      <WrappedComponent
        RHFProperty={RHFProperty}
        isLoading={signUpMutate.isPending || validateEmailMutate.isPending}
        onSubmit={onSubmit}
        passwordVisible={passowrdVisible}
        passwordConfirmVisible={passwordConfirmVisible}
      />
    );
  };

export const SignUpForm = withSignUpHandler(withLoading(SignUpFormComponent));
