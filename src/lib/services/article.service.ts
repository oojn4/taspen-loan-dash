import { SignInResponse } from "../../@types/auth";
import appConfig from "../../configs/app.config";
import ApiService from "../../services/ApiService";

const baseUrl = `${appConfig.backendApiUrl}`;

export const ArticleService = { 
    
  async createArticle(ClientInputArticle : ClientInputArticle): Promise<SignInResponse> {
    const accessToken = '23400f51-5cf7-4104-9527-2d6acf5c5f10|ynxBplpBOo3tyO6v6jHKLIjm6HqOC9qSrYQWpv4va7c46549';    
    const res = await ApiService.fetchData<ClientInputArticle, SignInResponse>({
      url: `${baseUrl}/articles`,
      method: 'POST',
      data: ClientInputArticle,
      headers: {
        Authorization: `Bearer ${accessToken}` // masi asal
      }
    })
    return res.data;
  }, 
}