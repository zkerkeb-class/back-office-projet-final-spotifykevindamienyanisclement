import { IResponse } from '@/types/response';
import { ITrack, ITrackFull } from '@/types/track';
import FetchPulseApi from './fetch';

const useTrackApi = () => {
  const getTracks = async (): Promise<IResponse<ITrackFull[]>> => {
    const { data, error, success, code }: IResponse<ITrackFull[]> =
      await FetchPulseApi({
        url: '/track',
        method: 'GET',
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const getTrackDetails = async (
    id: string | number
  ): Promise<IResponse<ITrackFull>> => {
    const { data, error, success, code }: IResponse<ITrackFull> =
      await FetchPulseApi({
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
      await FetchPulseApi({
        url: '/track',
        method: 'POST',
        body,
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const updateTrack = async (
    id: string | number,
    body: Partial<ITrack>
  ): Promise<IResponse<ITrackFull>> => {
    const { data, error, success, code }: IResponse<ITrackFull> =
      await FetchPulseApi({
        url: `/track/${id}`,
        method: 'PUT',
        body,
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const deleteTrack = async (
    id: string | number
  ): Promise<IResponse<ITrackFull>> => {
    const { data, error, success, code }: IResponse<ITrackFull> =
      await FetchPulseApi({
        url: `/track/${id}`,
        method: 'DELETE',
        params: null,
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  return { getTracks, getTrackDetails, createTrack, updateTrack, deleteTrack };
};

export default useTrackApi;
