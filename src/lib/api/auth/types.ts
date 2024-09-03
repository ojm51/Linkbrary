export interface AuthDTO {
  accessToken?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignUpParams extends LoginParams {
  name: string;
}

export interface SNSSIgnUpParams {
  name: string;
}

export interface EmailConfirmParams {
  email: LoginParams['email'];
}
