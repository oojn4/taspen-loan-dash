import { SignInResponse } from "../../@types/auth";
import appConfig from "../../configs/app.config";
import ApiService from "../../services/ApiService";

const baseUrl = `${appConfig.backendApiUrl}`;

export const UserService = { 
  async register(InputRegistrationData : InputRegistrationData): Promise<SignInResponse> {
    const res = await ApiService.fetchData<InputRegistrationData, SignInResponse>({
      url: `${baseUrl}/register`,
      method: 'POST',
      data: InputRegistrationData
    })
    return res.data;
  },
  async indexRegister(): Promise<SignInResponse> {
    const res = await ApiService.fetchData<any, SignInResponse>({
      url: `${baseUrl}/registrations?status=1`,
      method: 'GET',
    })
    return res.data;
  },
  async showRegister(id: string | null): Promise<SignInResponse> {
    const res = await ApiService.fetchData<any, SignInResponse>({
      url: `${baseUrl}/registrations/${id}`,
      method: 'GET',
    })
    return res.data;
  },
  async approveRegister(id: string | null): Promise<SignInResponse> {
    const res = await ApiService.fetchData<any, SignInResponse>({
      url: `${baseUrl}/users-approval/${id}?is_approved=1`,
      method: 'POST',
    })
    return res.data;
  },
  async rejectRegister(id: string | null): Promise<SignInResponse> {
    const res = await ApiService.fetchData<any, SignInResponse>({
      url: `${baseUrl}/users-approval/${id}?is_approved=0`,
      method: 'POST',
    })
    return res.data;
  },

  async profile(): Promise<SignInResponse> {
    const res = await ApiService.fetchData<any, SignInResponse>({
      url: `${baseUrl}/user`,
      method: 'GET',
    })
    return res.data;
  },
  async indexUser(): Promise<SignInResponse> {
    const res = await ApiService.fetchData<any, SignInResponse>({
      url: `${baseUrl}/users`,
      method: 'GET',
    })
    return res.data;
  },
  async searchUser(searchValue: string): Promise<SignInResponse> {
    const res = await ApiService.fetchData<any, SignInResponse>({
      url: `${baseUrl}/users/search`,
      method: 'POST',
      data: {search: searchValue}
    })
    return res.data;
  },
  async updateUser(id: string, InputRegistrationData : InputRegistrationData): Promise<SignInResponse> {
    const res = await ApiService.fetchData<InputRegistrationData, SignInResponse>({
      url: `${baseUrl}/users/${id}?`,
      method: 'PATCH',
      data: InputRegistrationData
    })
    return res.data;
  },
  
}