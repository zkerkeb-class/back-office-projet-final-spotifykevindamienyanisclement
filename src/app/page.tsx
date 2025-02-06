'use client';

import ManageList from '@/components/Manage/ManageList';
import CardArtistManage from '@/components/Card/Artist/CardArtistManage';
import CardGroupManage from '@/components/Card/Group/CardGroupManage';
import CardAlbumManage from '@/components/Card/Album/CardAlbumManage';
import CardTrackManage from '@/components/Card/Track/CardTrackManage';
import WrapperArtist from '@/components/Wrapper/WrapperArtist';
import WrapperGroup from '@/components/Wrapper/WrapperGroup';
import WrapperAlbum from '@/components/Wrapper/WrapperAlbum';
import WrapperTrack from '@/components/Wrapper/WrapperTrack';
import FormArtistFull from '@/components/Form/FormArtistFull';
import FormGroupFull from '@/components/Form/FormGroupFull';
import FormAlbumFull from '@/components/Form/FormAlbumFull';
import FormTrackFull from '@/components/Form/FormTrackFull';
import useArtistApi from '@/api/useArtist.api';
import useGroupApi from '@/api/useGroup.api';
import useAlbumApi from '@/api/useAlbum.api';
import useTrackApi from '@/api/useTrack.api';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

export default function Home() {
  const { getArtists, deleteArtist, updateArtist } = useArtistApi();
  const { getGroups, deleteGroup, updateGroup } = useGroupApi();
  const { getAlbums, deleteAlbum, updateAlbum } = useAlbumApi();
  const { getTracks, deleteTrack, updateTrack } = useTrackApi();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Artists</h2>
      <div
        className={styles.dashboard_wrapper}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') router.push(`/artist`);
        }}
        onClick={() => {
          router.push(`/artist`);
        }}
      >
        <ManageList
          Card={CardArtistManage}
          FormEdit={FormArtistFull}
          getDataAPI={getArtists}
          deleteDataAPI={deleteArtist}
          editDataAPI={updateArtist}
          limit={4}
          Wrapper={WrapperArtist}
        />
      </div>
      <h2 className={styles.title}>Groupes</h2>
      <div
        className={styles.dashboard_wrapper}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') router.push(`/group`);
        }}
        onClick={() => {
          router.push(`/group`);
        }}
      >
        <ManageList
          Card={CardGroupManage}
          FormEdit={FormGroupFull}
          getDataAPI={getGroups}
          deleteDataAPI={deleteGroup}
          editDataAPI={updateGroup}
          limit={4}
          Wrapper={WrapperGroup}
        />
      </div>
      <h2 className={styles.title}>Albums</h2>
      <div
        className={styles.dashboard_wrapper}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') router.push(`/album`);
        }}
        onClick={() => {
          router.push(`/album`);
        }}
      >
        <ManageList
          Card={CardAlbumManage}
          FormEdit={FormAlbumFull}
          getDataAPI={getAlbums}
          deleteDataAPI={deleteAlbum}
          editDataAPI={updateAlbum}
          limit={4}
          Wrapper={WrapperAlbum}
        />
      </div>
    </div>
  );
}
