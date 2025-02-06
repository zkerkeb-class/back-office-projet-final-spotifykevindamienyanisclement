import { IResponse } from '@/types/response';
import { IUser } from '@/types/user';
import { useRouter } from 'next/navigation';
import FetchSpotifyApi from './fetch';

const useUserApi = () => {
  const router = useRouter();

  const getUsers = async (
    limit: number,
    offset: number
  ): Promise<IResponse<IUser[]>> => {
    const { data, error, success, code }: IResponse<IUser[]> =
      await FetchSpotifyApi({
        url: '/users',
        method: 'GET',
        params: { limit, offset },
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const getUserDetails = async (
    id: string | number
  ): Promise<IResponse<IUser>> => {
    const { data, error, success, code }: IResponse<IUser> =
      await FetchSpotifyApi({
        url: `/users/${id}`,
        method: 'GET',
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const createUser = async (body: IUser): Promise<IResponse<IUser>> => {
    const { data, error, success, code }: IResponse<IUser> =
      await FetchSpotifyApi({
        url: '/users',
        method: 'POST',
        body,
        params: null,
        accessToken: JSON.parse(localStorage.getItem('token') || '{}'),
        logout: null,
      });
    if (code === 400 || code === 401) {
      localStorage.removeItem('token');
      router.push('/login');
    }
    return { data, error, success, code };
  };

  const updateUser = async (
    id: string | number,
    body: Partial<IUser>
  ): Promise<IResponse<IUser>> => {
    const { data, error, success, code }: IResponse<IUser> =
      await FetchSpotifyApi({
        url: `/users/${id}`,
        method: 'PUT',
        body,
        params: null,
        accessToken: JSON.parse(localStorage.getItem('token') || '{}'),
        logout: null,
      });
    if (code === 400 || code === 401) {
      localStorage.removeItem('token');
      router.push('/login');
    }
    return { data, error, success, code };
  };

  const deleteUser = async (id: string | number): Promise<IResponse<IUser>> => {
    const { data, error, success, code }: IResponse<IUser> =
      await FetchSpotifyApi({
        url: `/users/${id}`,
        method: 'DELETE',
        params: null,
        accessToken: JSON.parse(localStorage.getItem('token') || '{}'),
        logout: null,
      });
    if (code === 400 || code === 401) {
      localStorage.removeItem('token');
      router.push('/login');
    }
    return { data, error, success, code };
  };

  return { getUsers, getUserDetails, createUser, updateUser, deleteUser };
};

export default useUserApi;
