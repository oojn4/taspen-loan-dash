import { SignInResponse } from "../../@types/auth";
import appConfig from "../../configs/app.config";
import ApiService from "../../services/ApiService";

const baseUrl = `${appConfig.backendApiUrl}`;
export const MasterService = {
  async fetchCountries(): Promise<any> {
    const res = await ApiService.fetchData<any, SignInResponse>({
      url: `${baseUrl}/countries`,
      method: 'GET',
    })
    return res.data;
  },
  async fetchProvinces(): Promise<any> {
    const res = await ApiService.fetchData<any, SignInResponse>({
      url: `${baseUrl}/provinces`,
      method: 'GET',
    })
    return res.data;
  },
  async fetchCities(province_id: string): Promise<any> {
    const res = await ApiService.fetchData<any, SignInResponse>({
      url: `${baseUrl}/cities?province_id=${province_id}`,
      method: 'GET',
    })
    return res.data;
  },
  async fetchUniversities(): Promise<any> {
    const res = await ApiService.fetchData<any, SignInResponse>({
      url: `${baseUrl}/universities`,
      method: 'GET',
    })
    return res.data;
  },
  async fetchMajors(): Promise<any> {
    const res = await ApiService.fetchData<any, SignInResponse>({
      url: `${baseUrl}/majors`,
      method: 'GET',
    })
    return res.data;
  },
  async fetchOfficeCategories(): Promise<any> {
    const res = await ApiService.fetchData<any, SignInResponse>({
      url: `${baseUrl}/office-categories`,
      method: 'GET',
    })
    return res.data;
  },
  async fetchArticleCategory(): Promise<any> {
    const accessToken = '23400f51-5cf7-4104-9527-2d6acf5c5f10|ynxBplpBOo3tyO6v6jHKLIjm6HqOC9qSrYQWpv4va7c46549';
    const res = await ApiService.fetchData<any,any>({
      url: `${baseUrl}/article-categories`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}` // masi asal
      }
    })
    return res.data;
  },
}