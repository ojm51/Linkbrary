import { AxiosError } from 'axios';
import { API_PATH, instance } from '../config';
import { UserInfoDTO } from './types';

interface GetUserInfoHookParams {
  accessToken: string;
  onError: (error: AxiosError) => void;
  onSuccess: (data: UserInfoDTO) => void;
}

export const getUserInfo = async ({
  accessToken,
  onError,
  onSuccess,
}: GetUserInfoHookParams) => {
  const response = await instance
    .get<UserInfoDTO>(API_PATH.user.default, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      onSuccess(res.data);
      return res;
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        onError(error);
      }
    });

  return response;
};
