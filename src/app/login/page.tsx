'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, ChangeEvent } from 'react';
import { FetchResponse } from '@/app/components/hooks/useFetch/interface';
import useFetch from '@/app/components/hooks/useFetch/useFetch';
import Image from 'next/image';

function Index() {
  const router = useRouter();

  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const { fetchData, data, loading } = useFetch<FetchResponse>({
    url: 'auth/login',
    method: 'POST',
    body: userForm,
    token: undefined,
  });

  const submitLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await fetchData();
  };

  useEffect(() => {
    if (data && data.token) {
      localStorage.setItem('token', JSON.stringify(data.token));
      router.push('/');
    }
  }, [data, router]);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="h-screen flex justify-center items-center bg-zinc-950">
      <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md bg-zinc-900">
        <div className="flex justify-center mx-auto">
          <Image
            className="w-10 h-10"
            src="/spotify-icon.svg"
            alt="Spotify"
            width={40}
            height={40}
          />
        </div>

        <form onSubmit={submitLogin} className="mt-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-white dark:text-gray-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              value={userForm.email}
              placeholder="E-mail"
              type="email"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-white bg-zinc-900 border rounded focus:border-blue-400 focus:ring-green-500 focus:outline-none focus:ring focus:ring-opacity-80"
            />
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm text-white dark:text-gray-200"
              >
                Password
              </label>
            </div>
            <input
              id="password"
              name="password"
              value={userForm.password}
              placeholder="Password"
              type="password"
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-white bg-zinc-900 border rounded focus:border-blue-400 focus:ring-green-500 focus:outline-none focus:ring focus:ring-opacity-80"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-grey-700 capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Index;
