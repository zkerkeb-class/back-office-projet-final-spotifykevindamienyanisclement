// app/Album/page.tsx

'use client';

import useAlbumApi from '@/api/useAlbum.api';
import ManageList from '@/components/Manage/ManageList';
import CardAlbumManage from '@/components/Card/Album/CardAlbumManage';
import WrapperAlbum from '@/components/Wrapper/WrapperAlbum';
import FormAlbumFull from '@/components/Form/FormAlbumFull';
import styles from './index.module.scss';

function Index() {
  const { deleteAlbum, updateAlbum, getAlbums } = useAlbumApi();

  return (
    <div className={styles.container}>
      <h2>Album</h2>
      <ManageList
        Card={CardAlbumManage}
        FormEdit={FormAlbumFull}
        getDataAPI={getAlbums}
        deleteDataAPI={deleteAlbum}
        editDataAPI={updateAlbum}
        limit={15}
        Wrapper={WrapperAlbum}
      />
    </div>
  );
}

export default Index;
