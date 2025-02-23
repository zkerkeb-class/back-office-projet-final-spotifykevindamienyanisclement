'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import useFetch from '@/components/hooks/useFetch';

export const UserContext = React.createContext<{
  isLogged: boolean;
  logout: () => void;
}>({
  isLogged: false,
  logout: () => {},
});

function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [isLogged, setIsLogged] = React.useState<boolean>(false);
  const [token, setToken] = React.useState<string>('');

  interface UserData {
    message: string;
  }

  const { data, error, loading, fetchData } = useFetch<UserData>({
    url: 'user/me',
    method: 'GET',
    token,
  });

  useEffect(() => {
    const cookiesToken = Cookies.get('token');
    if (cookiesToken && cookiesToken.startsWith('Bearer')) {
      setToken(cookiesToken);
    } else {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (data?.message === 'Invalid token.') {
      Cookies.remove('token');
      setIsLogged(false);
      router.push('/login');
    } else {
      setIsLogged(true);
    }
  }, [data]);

  const logout = () => {
    setIsLogged(false);
    Cookies.remove('token');
    router.push('/login');
  };

  const contextValue = React.useMemo(() => ({ isLogged, logout }), [isLogged]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
