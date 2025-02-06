// app/Album/page.tsx

'use client';

import useAlbumApi from '@/api/useAlbum.api';
import ManageList from '@/components/Manage/ManageList';
import CardAlbumManage from '@/components/Card/Album/CardAlbumManage';
import WrapperAlbum from '@/components/Wrapper/WrapperAlbum';
import FormAlbumFull from '@/components/Form/FormAlbumFull';
import { IAlbum } from '@/types/album';
import styles from './index.module.scss';

function Index() {
  const { getAlbums, createAlbum, deleteAlbum, updateAlbum } = useAlbumApi();

  return (
    <div className={styles.container}>
      <h2>Album</h2>
      <ManageList
        Card={CardAlbumManage}
        FormEdit={FormAlbumFull}
        getDataAPI={getAlbums}
        // createDataAPI={createAlbum}
        deleteDataAPI={deleteAlbum}
        editDataAPI={updateAlbum}
        limit={10}
        Wrapper={WrapperAlbum}
      />
    </div>
  );
}

export default Index;
