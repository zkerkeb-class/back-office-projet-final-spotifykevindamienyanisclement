// app/Album/page.tsx

'use client';

import useAlbumApi from '@/api/useAlbum.api';
import ManageList from '@/components/Manage/ManageList';
import CardAlbumManage from '@/components/Card/Album/CardAlbumManage';
import WrapperAlbum from '@/components/Wrapper/WrapperAlbum';
import FormAlbumFull from '@/components/Form/FormAlbumFull';
import { IAlbum } from '@/types/album';

function Index() {
  const { getAlbums, createAlbum, deleteAlbum, updateAlbum } = useAlbumApi();

  return (
    <ManageList
      Card={CardAlbumManage}
      FormEdit={FormAlbumFull}
      getDataAPI={getAlbums}
      // createDataAPI={createAlbum}
      deleteDataAPI={deleteAlbum}
      editDataAPI={updateAlbum}
      limit={10}
      Wrapper={WrapperAlbum}
      // textTitle="Mes Bannières"
    />
  );
}

export default Index;
