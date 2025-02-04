import type { IImage } from './image';
import type { IUser } from './user';
import type { ITrack } from './track';

export interface IPlaylist {
  id: number;
  title: string;

  imageId: number | null;
  image: IImage | null;

  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPlaylistFull {
  id: number;
  title: string;

  image: IImage | null;
  imageId: number | null;
  user: IUser;
  userId: number;
  tracks: ITrack[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IPlaylistCreate {
  title: string;
  imageId: number;
  userId: number;
}
