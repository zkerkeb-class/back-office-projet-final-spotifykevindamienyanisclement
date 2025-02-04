'use client';

import { useParams } from 'next/navigation';
import useArtistApi from '@/api/useArtist.api';
import ManageItem from '@/components/Manage/ManageItem';
import CardArtistManageDetails from '@/components/Card/Artist/CardArtistManageDetails';
import FormArtistFull from '@/components/Form/FormArtistFull';
import { IArtist } from '@/types/artist';

function Index() {
  const params = useParams<{ id: string }>();
  const { getArtistDetails, createArtist, deleteArtist, updateArtist } =
    useArtistApi();

  return (
    <div>
      <ManageItem
        Card={CardArtistManageDetails}
        getDataAPI={(id: string | number) => getArtistDetails(id.toString())}
        createDataAPI={createArtist}
        editDataAPI={updateArtist}
        deleteDataAPI={deleteArtist}
        FormEdit={FormArtistFull}
        id={params.id}
      />
    </div>
  );
}

export default Index;
