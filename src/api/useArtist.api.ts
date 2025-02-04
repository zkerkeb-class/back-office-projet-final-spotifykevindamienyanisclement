import { IResponse } from '@/types/response';
import { IArtist } from '@/interfaces/artist.interface';
import FetchPulseApi from './fetch';

const useArtistApi = () => {
  const getArtists = async (): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchPulseApi({
      url: '/artist',
      method: 'GET',
      params: null,
      accessToken: null,
      logout: null,
    });
    return { data, error, success, code };
  };

  const getArtistDetails = async (id: string): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchPulseApi({
      url: `/artist/${id}`,
      method: 'GET',
      params: null,
      accessToken: null,
      logout: null,
    });
    return { data, error, success, code };
  };

  const createArtist = async (data: any): Promise<IResponse> => {
    const {
      data: responseData,
      error,
      success,
      code,
    }: IResponse = await FetchPulseApi({
      url: '/artist',
      method: 'POST',
      body: data,
      params: null,
      accessToken: null,
      logout: null,
    });
    return { data: responseData, error, success, code };
  };

  const updateArtist = async (id: string, data: any): Promise<IResponse> => {
    const {
      data: responseData,
      error,
      success,
      code,
    }: IResponse = await FetchPulseApi({
      url: `/artist/${id}`,
      method: 'PUT',
      body: data,
      params: null,
      accessToken: null,
      logout: null,
    });
    return { data: responseData, error, success, code };
  };

  const deleteArtist = async (id: string): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchPulseApi({
      url: `/artist/${id}`,
      method: 'DELETE',
      params: null,
      accessToken: null,
      logout: null,
    });
    return { data, error, success, code };
  };

  return {
    getArtists,
    getArtistDetails,
    createArtist,
    updateArtist,
    deleteArtist,
  };
};

export default useArtistApi;
