import type { IAlbum } from './album';
import type { IArtist } from './artist';
import type { IImage } from './image';

export interface IGroup {
  id: string | number;
  name: string;

  imageId: number | null;
  image: IImage | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface IGroupFull {
  id: string | number;
  name: string;

  image: IImage | null;
  imageId: number | null;

  albums: IAlbum[];
  artists: IArtist[];

  createdAt: Date;
  updatedAt: Date;
}

export interface IGroupCreate {
  name: string;
  imageId: number;
}
