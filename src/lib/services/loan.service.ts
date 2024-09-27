import appConfig from "../../configs/app.config";
import ApiService from "../../services/ApiService";

const baseUrl = `${appConfig.backendApiUrl}`;

export const LoanService = { 
    
  async sendLoanData(LoanInputServer : LoanInputServer): Promise<LoanOutput> {
    const res = await ApiService.fetchData<LoanInputServer, LoanOutput>({
      url: `${baseUrl}/predict`,
      method: 'POST',
      data: LoanInputServer,
    })
    return res.data;
  }, 
}