import { API_PATH, instance } from '../config';
import { UserInfoDTO } from './types';

export const getUserInfo = async (accessToken: string) => {
  const response = await instance.get<UserInfoDTO>(API_PATH.user.default, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
