'use client';

import useArtistApi from '@/api/useArtist.api';
import ManageList from '@/components/Manage/ManageList';
import CardArtistManage from '@/components/Card/Artist/CardArtistManage';
import WrapperArtist from '@/components/Wrapper/WrapperArtist';
import FormArtistFull from '@/components/Form/FormArtistFull';
import { IArtist } from '@/types/artist';
import styles from './index.module.scss';

function Index() {
  const { getArtists, createArtist, deleteArtist, updateArtist } =
    useArtistApi();

  return (
    <div className={styles.container}>
      <h2>Artists</h2>
      <ManageList
        Card={CardArtistManage}
        FormEdit={FormArtistFull}
        getDataAPI={getArtists}
        // createDataAPI={createArtist}
        deleteDataAPI={deleteArtist}
        editDataAPI={updateArtist}
        limit={10}
        Wrapper={WrapperArtist}
      />
    </div>
  );
}

export default Index;
