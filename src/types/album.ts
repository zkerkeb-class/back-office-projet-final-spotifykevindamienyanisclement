import type { IImage } from './image';
import type { IArtist } from './artist';
import type { IGroup } from './group';
import type { ITrack } from './track';

export interface IAlbum {
  id: string | number;
  title: string;

  imageId: number | null;
  image: IImage | null;

  artistId: number | null;
  groupId: number | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface IAlbumFull {
  id: string | number;
  title: string;

  image: IImage | null;
  imageId: number | null;

  artist: IArtist | null;
  artistId: number | null;

  group: IGroup | null;
  groupId: number | null;

  tracks: ITrack[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IAlbumCreate {
  title: string;

  image: IImage | null;
  artistId: number;
  groupId: number;
}
