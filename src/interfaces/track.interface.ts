/* eslint-disable import/no-cycle */

import { IArtist } from './artist.interface';
import { IAlbum } from './album.interface';
import { ISound } from './sound.interface';
import { IPlaylist } from './playlist.interface';

export interface ITrackFull {
  id: number;
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

export interface ITrack {
  id: number;
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
}

export interface ITrackCreateFull {
  title: string;
  soundId: number;
  albumId: number;
}
