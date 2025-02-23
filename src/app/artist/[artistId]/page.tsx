'use client';

import { useParams } from 'next/navigation';
import useArtistApi from '@/api/useArtist.api';
import ManageItem from '@/components/Manage/ManageItem';
import CardArtistManageDetails from '@/components/Card/Artist/CardArtistManageDetails';
import FormArtistFull from '@/components/Form/FormArtistFull';

function Index() {
  const params = useParams<{ artistId: string }>();
  const { getArtistDetails, createArtist, deleteArtist, updateArtist } =
    useArtistApi();

  return (
    <div>
      <ManageItem
        Card={CardArtistManageDetails}
        getDataAPI={(artistId: string | number) =>
          getArtistDetails(artistId?.toString())
        }
        createDataAPI={createArtist}
        editDataAPI={updateArtist}
        deleteDataAPI={deleteArtist}
        FormEdit={FormArtistFull}
        id={params.artistId}
      />
    </div>
  );
}

export default Index;
