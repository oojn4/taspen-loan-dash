
import appConfig from "../configs/app.config";

interface fetchClientProps {
  method?: string;
  url: string;
  body?: string;
  token?: string;
  mode? : RequestMode;
}

async function fetchClient({ method = "GET", url, body = "", token }: fetchClientProps) {
  try {
    // const user = useSelector((state: RootState) => state.auth.user);
    // const accessToken = token || user?.access_token;
    
    const response = await fetch(url.toString(), {
      method: method,
      //@ts-ignore
      headers: {
        "X-Authorization": appConfig.backendApiKey,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: (token) ? "Bearer " + token : "",
      },
      body: body || undefined,
    });

    if (!response.ok) {
      throw response;
    }

    return response;
  } catch (error) {
    if (error instanceof Response) {
      if (error.status === 401) {
        
      }

      throw error;
    }

    throw new Error("Failed to fetch data", { cause: error });
  }
}

export default fetchClient;
