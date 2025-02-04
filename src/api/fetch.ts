import { IResponse } from '@/types/response';

interface IFetchPulseApi {
  url: string;
  method: string;
  body?: any;
  params?: any;
  accessToken: string | null;
  logout: (() => void) | null;
}

const FetchPulseApi = async ({
  url,
  method,
  body,
  params,
  accessToken,
  logout,
}: IFetchPulseApi): Promise<IResponse> => {
  let data = null;
  let success = false;
  let error: Error | null = null;

  try {
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Request Timeout'));
      }, 10000);
    });

    const responsePromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      headers: {
        ...(accessToken && {
          authorization: accessToken,
        }),
        'Content-Type': body ? 'application/json' : 'text/plain',
      },
      method,
      ...(body && {
        body: JSON.stringify(body),
      }),
      ...(params && {
        params: JSON.stringify(params),
      }),
    });

    const response = (await Promise.race([
      responsePromise,
      timeout,
    ])) as Response;
    const dataJson = await response.json();
    const statusCode = response.status;
    if (statusCode === 401 && logout) {
      logout();
    }
    if (statusCode < 200 || statusCode >= 300) {
      error = new Error(dataJson.message);
      return { data, error, success, code: statusCode };
    }
    data = dataJson;
    success = true;
    return { data, error, success, code: statusCode };
  } catch (err) {
    error = new Error((err as Error).message || 'Internal Server Error');
    success = false;
    return { data, error, success, code: 500 };
  }
};

export default FetchPulseApi;
