'use client';

import useArtistApi from '@/api/useArtist.api';
import ManageList from '@/components/Manage/ManageList';
import CardArtistManage from '@/components/Card/Artist/CardArtistManage';
import WrapperArtist from '@/components/Wrapper/WrapperArtist';
import FormArtistFull from '@/components/Form/FormArtistFull';
import { IArtist } from '@/types/artist';

function Index() {
  const { getArtists, createArtist, deleteArtist, updateArtist } =
    useArtistApi();

  return (
    <ManageList
      Card={CardArtistManage}
      FormEdit={FormArtistFull}
      getDataAPI={getArtists}
      // createDataAPI={createArtist}
      deleteDataAPI={deleteArtist}
      editDataAPI={updateArtist}
      limit={10}
      Wrapper={WrapperArtist}
      // textTitle="Liste des artistes"
    />
  );
}

export default Index;
