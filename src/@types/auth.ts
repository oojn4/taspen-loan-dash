import { User } from "./user"

export type SignInCredential = { //used
  email: string
  password: string
}

export type ForgotPasswordReq = {
  email: string
}

export interface SignInResponse { //used
  user: User
  success: string
  message: string
  access_token: string
}

export interface ResponseInfoObject {
  status: 'success' | 'failed';
  error_code?: number;
  message?: string;
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
  name: string
  username: string
  password: string
}

