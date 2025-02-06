import { IResponse } from '@/types/response';

interface IFetchSpotifyApi {
  url: string;
  method: string;
  body?: any;
  formData?: any;
  params?: any;
  accessToken: string | null;
  logout: (() => void) | null;
}

const FetchSpotifyApi = async ({
  url,
  method,
  body,
  formData,
  params,
  accessToken,
  logout,
}: IFetchSpotifyApi): Promise<IResponse> => {
  let data = null;
  let success = false;
  let error: Error | null = null;

  try {
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error('Request Timeout'));
      }, 10000);
    });

    const urlParams = new URLSearchParams(params).toString();

    const responsePromise = fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${url}?${urlParams}`,
      {
        headers: {
          ...(accessToken && {
            authorization: accessToken,
          }),

          ...(body && {
            'Content-Type': 'application/json',
          }),
        },
        ...(params && {
          params: JSON.stringify(params),
        }),
        method,
        ...(body && {
          body: JSON.stringify(body),
        }),
        ...(formData && {
          body: formData,
        }),
      }
    );

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

export default FetchSpotifyApi;
