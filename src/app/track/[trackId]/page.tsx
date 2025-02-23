'use client';

import { useParams } from 'next/navigation';
import useTrackApi from '@/api/useTrack.api';
import ManageItem from '@/components/Manage/ManageItem';
import CardTrackManageDetails from '@/components/Card/Track/CardTrackManageDetails';
import FormTrackFull from '@/components/Form/FormTrackFull';
import { ITrackFull } from '@/types/track';

function Index() {
  const params = useParams<{ trackId: string }>();
  const { getTrackDetails, createTrack, deleteTrack, updateTrack } =
    useTrackApi();

  return (
    <div>
      <ManageItem<ITrackFull>
        Card={CardTrackManageDetails}
        getDataAPI={(trackId: string | number) =>
          getTrackDetails(trackId?.toString())
        }
        createDataAPI={createTrack}
        editDataAPI={updateTrack}
        deleteDataAPI={deleteTrack}
        FormEdit={FormTrackFull}
        id={params.trackId}
      />
    </div>
  );
}

export default Index;
