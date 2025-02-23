'use client';

import useTrackApi from '@/api/useTrack.api';
import ManageList from '@/components/Manage/ManageList';
import CardTrackManage from '@/components/Card/Track/CardTrackManage';
import WrapperTrack from '@/components/Wrapper/WrapperTrack';
import FormTrackFull from '@/components/Form/FormTrackFull';
import { ITrackFull } from '@/types/track';
import styles from './index.module.scss';

function Index() {
  const { getTracks, deleteTrack, updateTrack } = useTrackApi();

  return (
    <div className={styles.container}>
      <h2>Titres</h2>
      <ManageList
        Card={CardTrackManage}
        FormEdit={FormTrackFull}
        getDataAPI={getTracks}
        // createDataAPI={createTrack}
        deleteDataAPI={deleteTrack}
        editDataAPI={updateTrack}
        limit={15}
        Wrapper={WrapperTrack}
      />
    </div>
  );
}

export default Index;
