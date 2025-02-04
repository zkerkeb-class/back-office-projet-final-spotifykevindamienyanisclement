import { IResponse } from '@/types/response';
import { IGroup } from '@/types/group';
import FetchPulseApi from './fetch';

const useGroupApi = () => {
  const getGroups = async (): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchPulseApi({
      url: '/artist-groups',
      method: 'GET',
      params: null,
      accessToken: null,
      logout: null,
    });
    return { data, error, success, code };
  };

  const getGroupDetails = async (id: string): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchPulseApi({
      url: `/artist-groups/${id}`,
      method: 'GET',
      params: null,
      accessToken: null,
      logout: null,
    });
    return { data, error, success, code };
  };

  const createGroup = async (body: IGroup): Promise<IResponse<IGroup>> => {
    const { data, error, success, code }: IResponse<IGroup> =
      await FetchPulseApi({
        url: '/group',
        method: 'POST',
        body,
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const updateGroup = async (
    id: string | number,
    body: Partial<IGroup>
  ): Promise<IResponse<IGroup>> => {
    const { data, error, success, code }: IResponse<IGroup> =
      await FetchPulseApi({
        url: `/group/${id}`,
        method: 'PUT',
        body,
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const deleteGroup = async (id: string): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchPulseApi({
      url: `/artist-groups/${id}`,
      method: 'DELETE',
      params: null,
      accessToken: null,
      logout: null,
    });
    return { data, error, success, code };
  };

  return { getGroups, getGroupDetails, createGroup, updateGroup, deleteGroup };
};

export default useGroupApi;
