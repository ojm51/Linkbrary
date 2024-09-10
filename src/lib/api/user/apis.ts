import { API_PATH, instance } from '../config';
import { UserInfoDTO } from './types';

interface GetUserInfoHookParams {
  accessToken: string;
}

export const getUserInfo = async ({ accessToken }: GetUserInfoHookParams) => {
  const response = await instance.get<UserInfoDTO>(API_PATH.user.default, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
