'use client';

import { useParams } from 'next/navigation';
import useAlbumApi from '@/api/useAlbum.api';
import ManageItem from '@/components/Manage/ManageItem';
import CardAlbumManageDetails from '@/components/Card/Album/CardAlbumManageDetails';
import FormAlbumFull from '@/components/Form/FormAlbumFull';
import { IAlbum } from '@/types/album';

function Index() {
  const params = useParams<{ id: string }>();
  const { getAlbumDetails, createAlbum, deleteAlbum, updateAlbum } =
    useAlbumApi();

  return (
    <div>
      <ManageItem<IAlbum>
        Card={CardAlbumManageDetails}
        getDataAPI={(id: string | number) => getAlbumDetails(id.toString())}
        createDataAPI={createAlbum}
        editDataAPI={updateAlbum}
        deleteDataAPI={deleteAlbum}
        FormEdit={FormAlbumFull}
        id={params.id}
      />
    </div>
  );
}

export default Index;
