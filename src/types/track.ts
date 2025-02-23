import type { IAlbum } from './album';
import type { IArtist } from './artist';
import type { IPlaylist } from './playlist';
import type { ISound } from './sound';

export interface ITrack {
  id: string | number;
  title: string;

  soundId: number | null;
  sound: ISound | null;
  albumId: number;
  playlistId: number | null;
  artistId: number | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface ITrackCreate {
  title: string;
  soundId: number;
  albumId: number;
}

export interface ITrackFull {
  id: string | number;
  title: string;

  sound: ISound;
  soundId: number;

  album: IAlbum;
  albumId: number;

  playlist: IPlaylist;
  playlistId: number;

  artist: IArtist;
  artistId: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface ITrackCreateFull {
  title: string;
  soundId: number;
  albumId: number;
}
