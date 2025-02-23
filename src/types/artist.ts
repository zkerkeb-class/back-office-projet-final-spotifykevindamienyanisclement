import type { IAlbum } from './album';
import type { IGroup } from './group';
import type { IImage } from './image';
import type { ITrack } from './track';

export interface IArtist {
  id: string | number;
  name: string;

  imageId: number | null;
  image: IImage | null;

  albums: IAlbum[];
  tracks: ITrack[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IArtistFull {
  id: string | number;
  name: string;

  image: IImage | null;
  imageId: number | null;

  groupId: number | null;
  group: IGroup | null;

  albums: IAlbum[];
  tracks: ITrack[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IArtistCreate {
  name: string;
  imageId: number;
  groupId: number | null;
}
