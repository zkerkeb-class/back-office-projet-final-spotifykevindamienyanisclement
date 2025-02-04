import { useState } from 'react';

interface FetchProps {
  url: string;
  method: string;
  body?: object;
  token?: string;
}

const useFetch = <T>({ url, method, body, token }: FetchProps) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // handle error
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${url}`,
        {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(token && {
              authorization: token,
            }),
          },
          ...(body && {
            body: JSON.stringify(body),
          }),
        }
      );
      const dataJson = await response.json();
      if (dataJson.code && dataJson.code !== 200) {
        setError(dataJson.message);
      }
      setData(dataJson);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  return { fetchData, data, error, loading };
};

export default useFetch;
