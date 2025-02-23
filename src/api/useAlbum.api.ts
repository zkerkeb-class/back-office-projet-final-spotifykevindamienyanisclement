'use client';

import { IResponse } from '@/types/response';
import { IAlbum } from '@/types/album';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import FetchSpotifyApi from './fetch';

const useAlbumApi = () => {
  const router = useRouter();

  const getAlbums = async (
    limit: number,
    offset: number
  ): Promise<IResponse<IAlbum[]>> => {
    const { data, error, success, code }: IResponse<IAlbum[]> =
      await FetchSpotifyApi({
        url: '/album',
        method: 'GET',
        params: { limit, offset },
        accessToken: null,
        logout: null,
      });
    return { data, error, success, code };
  };

  const getAlbumDetails = async (
    id: string | number
  ): Promise<IResponse<IAlbum>> => {
    const { data, error, success, code }: IResponse<IAlbum> =
      await FetchSpotifyApi({
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
      await FetchSpotifyApi({
        url: '/album',
        method: 'POST',
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

  const updateAlbum = async (
    id: string | number,
    body: Partial<IAlbum>
  ): Promise<IResponse<IAlbum>> => {
    const { data, error, success, code }: IResponse<IAlbum> =
      await FetchSpotifyApi({
        url: `/album/${id}`,
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

  const deleteAlbum = async (
    id: string | number
  ): Promise<IResponse<IAlbum>> => {
    const { data, error, success, code }: IResponse<IAlbum> =
      await FetchSpotifyApi({
        url: `/album/${id}`,
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

  const getAlbumTracks = async (
    limit: number,
    offset: number,
    id: number | string
  ): Promise<IResponse> => {
    const { data, error, success, code }: IResponse = await FetchSpotifyApi({
      url: `/album/${id}`,
      method: 'GET',
      params: { limit, offset },
      accessToken: null,
      logout: null,
    });
    const tracks = data?.tracks;
    if (!tracks) {
      return { data: [], error, success, code };
    }
    console.log(tracks);
    return { data: tracks, error, success, code };
  };

  return {
    getAlbums,
    getAlbumDetails,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getAlbumTracks,
  };
};

export default useAlbumApi;
