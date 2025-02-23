import { IResponse } from '@/types/response';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import FetchSpotifyApi from './fetch';

const useArtistApi = () => {
  const router = useRouter();

  const getArtists = async (
    limit: number,
    offset: number
  ): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchSpotifyApi({
      url: '/artist',
      method: 'GET',
      params: { limit, offset },
      accessToken: null,
      logout: null,
    });
    return { data, error, success, code };
  };

  const getArtistDetails = async (id: string): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchSpotifyApi({
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
    }: IResponse = await FetchSpotifyApi({
      url: '/artist',
      method: 'POST',
      body: data,
      params: null,
      accessToken: JSON.parse(Cookies.get('token') || '{}'),
      logout: null,
    });
    if (code === 400 || code === 401) {
      Cookies.remove('token');
      router.push('/login');
    }
    return { data: responseData, error, success, code };
  };

  const updateArtist = async (id: string, data: any): Promise<IResponse> => {
    const {
      data: responseData,
      error,
      success,
      code,
    }: IResponse = await FetchSpotifyApi({
      url: `/artist/${id}`,
      method: 'PUT',
      body: data,
      params: null,
      accessToken: JSON.parse(Cookies.get('token') || '{}'),
      logout: null,
    });
    if (code === 400 || code === 401) {
      Cookies.remove('token');
      router.push('/login');
    }
    return { data: responseData, error, success, code };
  };

  const deleteArtist = async (id: string): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchSpotifyApi({
      url: `/artist/${id}`,
      method: 'DELETE',
      params: null,
      accessToken: JSON.parse(Cookies.get('token') || '{}'),
      logout: null,
    });
    if (code === 400 || code === 401) {
      router.push('/login');
    }
    return { data, error, success, code };
  };

  const getArtistAlbums = async (
    limit: number,
    offset: number,
    id: number | string
  ): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchSpotifyApi({
      url: `/artist/${id}`,
      method: 'GET',
      params: { limit, offset },
      accessToken: null,
      logout: null,
    });
    const albums = data?.albums;
    if (!albums) {
      return { data: [], error, success, code };
    }
    console.log(albums);
    return { data: albums, error, success, code };
  };

  return {
    getArtists,
    getArtistDetails,
    createArtist,
    updateArtist,
    deleteArtist,
    getArtistAlbums,
  };
};

export default useArtistApi;
