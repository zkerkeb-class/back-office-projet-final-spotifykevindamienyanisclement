import { IResponse } from '@/types/response';
import FetchSpotifyApi from './fetch';

const useUploadApi = () => {
  const uploadImage = async (formData: any): Promise<IResponse<any>> => {
    const { data, error, success, code }: IResponse<any> =
      await FetchSpotifyApi({
        url: '/upload/image',
        method: 'POST',
        body: null,
        formData,
        params: null,
        accessToken: JSON.parse(localStorage.getItem('token') || '{}'),
        logout: null,
      });
    const image = data?.image;
    return { data: image, error, success, code };
  };

  const uploadAudio = async (formData: any): Promise<IResponse<any>> => {
    const { data, error, success, code }: IResponse<any> =
      await FetchSpotifyApi({
        url: '/upload/audio',
        method: 'POST',
        body: null,
        formData,
        params: null,
        accessToken: JSON.parse(localStorage.getItem('token') || '{}'),
        logout: null,
      });
    const audio = data?.audio;
    return { data: audio, error, success, code };
  };

  return { uploadImage, uploadAudio };
};

export default useUploadApi;
