import { API_PATH, instance } from '../config';
import {
  AuthDTO,
  EmailConfirmParams,
  LoginParams,
  SignUpParams,
} from './types';

export const signUp = async ({ email, name, password }: SignUpParams) => {
  const params = { email, name, password };
  const response = await instance
    .post<AuthDTO>(API_PATH.auth.signUp, JSON.stringify(params))
    .then((res) => res)
    .catch(() => {});

  return response;
};

export const validateEmail = async ({ email }: EmailConfirmParams) => {
  const params = { email };
  const response = await instance
    .post(API_PATH.user.emailCheck, JSON.stringify(params))
    .then((res) => res)
    .catch(() => {});

  return response;
};

export const login = async ({ email, password }: LoginParams) => {
  const params = { email, password };
  const response = await instance
    .post<AuthDTO>(API_PATH.auth.Login, JSON.stringify(params))
    .then((res) => res)
    .catch(() => {});

  return response;
};
