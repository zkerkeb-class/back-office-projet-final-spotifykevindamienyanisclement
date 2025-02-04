'use client';

import useTrackApi from '@/api/useTrack.api';
import ManageList from '@/components/Manage/ManageList';
import CardTrackManage from '@/components/Card/Track/CardTrackManage';
import WrapperTrack from '@/components/Wrapper/WrapperTrack';
import FormTrackFull from '@/components/Form/FormTrackFull';
import { ITrackFull } from '@/types/track';

function Index() {
  const { getTracks, createTrack, deleteTrack, updateTrack } = useTrackApi();

  return (
    <ManageList
      Card={CardTrackManage}
      FormEdit={FormTrackFull}
      getDataAPI={getTracks}
      // createDataAPI={createTrack}
      deleteDataAPI={deleteTrack}
      editDataAPI={updateTrack}
      limit={10}
      Wrapper={WrapperTrack}
      // textTitle="Mes Tracks"
    />
  );
}

export default Index;
