import { IResponse } from '@/types/response';
import { IUser } from '@/types/user';
import FetchPulseApi from './fetch';

const useUserApi = () => {
  const getUsers = async (): Promise<IResponse<IUser[]>> => {
    const { data, error, success, code }: IResponse<IUser[]> =
      await FetchPulseApi({
        url: '/users',
        method: 'GET',
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const getUserDetails = async (
    id: string | number
  ): Promise<IResponse<IUser>> => {
    const { data, error, success, code }: IResponse<IUser> =
      await FetchPulseApi({
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
      await FetchPulseApi({
        url: '/users',
        method: 'POST',
        body,
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const updateUser = async (
    id: string | number,
    body: Partial<IUser>
  ): Promise<IResponse<IUser>> => {
    const { data, error, success, code }: IResponse<IUser> =
      await FetchPulseApi({
        url: `/users/${id}`,
        method: 'PUT',
        body,
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const deleteUser = async (id: string | number): Promise<IResponse<IUser>> => {
    const { data, error, success, code }: IResponse<IUser> =
      await FetchPulseApi({
        url: `/users/${id}`,
        method: 'DELETE',
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  return { getUsers, getUserDetails, createUser, updateUser, deleteUser };
};

export default useUserApi;
