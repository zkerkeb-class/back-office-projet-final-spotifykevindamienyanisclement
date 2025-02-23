import { IResponse } from '@/types/response';
import { ITrack, ITrackFull } from '@/types/track';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import FetchSpotifyApi from './fetch';

const useTrackApi = () => {
  const router = useRouter();

  const getTracks = async (
    limit: number,
    offset: number
  ): Promise<IResponse<ITrackFull[]>> => {
    const { data, error, success, code }: IResponse<ITrackFull[]> =
      await FetchSpotifyApi({
        url: '/track',
        method: 'GET',
        params: { limit, offset },
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const getTrackDetails = async (
    id: string | number
  ): Promise<IResponse<ITrackFull>> => {
    const { data, error, success, code }: IResponse<ITrackFull> =
      await FetchSpotifyApi({
        url: `/track/${id}`,
        method: 'GET',
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const createTrack = async (body: ITrack): Promise<IResponse<ITrackFull>> => {
    const { data, error, success, code }: IResponse<ITrackFull> =
      await FetchSpotifyApi({
        url: '/track',
        method: 'POST',
        body,
        formData: null,
        params: null,
        accessToken: JSON.parse(Cookies.get('token') || '{}'),
        logout: null,
      });
    if (code === 400 || code === 401) {
      Cookies.remove('token');
      router.push('/login');
    }
    return { data, error, success, code };
  };

  const updateTrack = async (
    id: string | number,
    body: Partial<ITrack>
  ): Promise<IResponse<ITrackFull>> => {
    const { data, error, success, code }: IResponse<ITrackFull> =
      await FetchSpotifyApi({
        url: `/track/${id}`,
        method: 'PUT',
        body,
        params: null,
        accessToken: JSON.parse(Cookies.get('token') || '{}'),
        logout: null,
      });
    if (code === 400 || code === 401) {
      Cookies.remove('token');
      router.push('/login');
    }
    return { data, error, success, code };
  };

  const deleteTrack = async (
    id: string | number
  ): Promise<IResponse<ITrackFull>> => {
    const { data, error, success, code }: IResponse<ITrackFull> =
      await FetchSpotifyApi({
        url: `/track/${id}`,
        method: 'DELETE',
        params: null,
        accessToken: JSON.parse(Cookies.get('token') || '{}'),
        logout: null,
      });
    if (code === 400 || code === 401) {
      Cookies.remove('token');
      router.push('/login');
    }
    return { data, error, success, code };
  };

  return { getTracks, getTrackDetails, createTrack, updateTrack, deleteTrack };
};

export default useTrackApi;
