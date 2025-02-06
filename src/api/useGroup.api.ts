import { IResponse } from '@/types/response';
import { IGroup } from '@/types/group';
import { useRouter } from 'next/navigation';
import FetchSpotifyApi from './fetch';

const useGroupApi = () => {
  const router = useRouter();

  const getGroups = async (
    limit: number,
    offset: number
  ): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchSpotifyApi({
      url: '/group',
      method: 'GET',
      params: { limit, offset },
      accessToken: null,
      logout: null,
    });
    return { data, error, success, code };
  };

  const getGroupDetails = async (id: string): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchSpotifyApi({
      url: `/group/${id}`,
      method: 'POST',
      params: null,
      accessToken: null,
      logout: null,
    });
    return { data, error, success, code };
  };

  const createGroup = async (body: IGroup): Promise<IResponse<IGroup>> => {
    const { data, error, success, code }: IResponse<IGroup> =
      await FetchSpotifyApi({
        url: '/group',
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

  const updateGroup = async (
    id: string | number,
    body: Partial<IGroup>
  ): Promise<IResponse<IGroup>> => {
    const { data, error, success, code }: IResponse<IGroup> =
      await FetchSpotifyApi({
        url: `/group/${id}`,
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

  const deleteGroup = async (id: string): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchSpotifyApi({
      url: `/artist-groups/${id}`,
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

  return { getGroups, getGroupDetails, createGroup, updateGroup, deleteGroup };
};

export default useGroupApi;
