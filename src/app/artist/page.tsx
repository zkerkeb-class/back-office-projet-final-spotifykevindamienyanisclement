'use client';

import useArtistApi from '@/api/useArtist.api';
import ManageList from '@/components/Manage/ManageList';
import CardArtistManage from '@/components/Card/Artist/CardArtistManage';
import WrapperArtist from '@/components/Wrapper/WrapperArtist';
import FormArtistFull from '@/components/Form/FormArtistFull';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

function Index() {
  const { getArtists, createArtist, deleteArtist, updateArtist } =
    useArtistApi();
  const router = useRouter();
  return (
    <div className={styles.container}>
      <h1>Manage Artists</h1>
      <Button
        title="Create Artist"
        className="btn__big"
        handleClick={() => router.push('/artist/create')}
        type="button"
      />
      <ManageList
        Card={CardArtistManage}
        FormEdit={FormArtistFull}
        getDataAPI={getArtists}
        deleteDataAPI={deleteArtist}
        editDataAPI={updateArtist}
        limit={15}
        Wrapper={WrapperArtist}
      />
    </div>
  );
}

export default Index;
