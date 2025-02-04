import { IResponse } from '@/types/response';
import { IAlbum } from '@/types/album';
import FetchPulseApi from './fetch';

const useAlbumApi = () => {
  const getAlbums = async (): Promise<IResponse<IAlbum[]>> => {
    const { data, error, success, code }: IResponse<IAlbum[]> =
      await FetchPulseApi({
        url: '/album',
        method: 'GET',
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const getAlbumDetails = async (
    id: string | number
  ): Promise<IResponse<IAlbum>> => {
    const { data, error, success, code }: IResponse<IAlbum> =
      await FetchPulseApi({
        url: `/album/${id}`,
        method: 'GET',
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const createAlbum = async (body: IAlbum): Promise<IResponse<IAlbum>> => {
    const { data, error, success, code }: IResponse<IAlbum> =
      await FetchPulseApi({
        url: '/album',
        method: 'POST',
        body,
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const updateAlbum = async (
    id: string | number,
    body: Partial<IAlbum>
  ): Promise<IResponse<IAlbum>> => {
    const { data, error, success, code }: IResponse<IAlbum> =
      await FetchPulseApi({
        url: `/album/${id}`,
        method: 'PUT',
        body,
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const deleteAlbum = async (
    id: string | number
  ): Promise<IResponse<IAlbum>> => {
    const { data, error, success, code }: IResponse<IAlbum> =
      await FetchPulseApi({
        url: `/album/${id}`,
        method: 'DELETE',
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  return { getAlbums, getAlbumDetails, createAlbum, updateAlbum, deleteAlbum };
};

export default useAlbumApi;
