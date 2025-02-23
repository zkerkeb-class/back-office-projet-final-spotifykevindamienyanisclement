import Spacer from '@/components/UI/Spacer';
import Image from 'next/image';
import { IAlbum } from '@/types/album';
import normalizeImageUrl from '@/utils/normalizeImageUrl';
import ManageList from '@/components/Manage/ManageList';
import WrapperManageList from '@/components/Wrapper/WrapperManageList';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';
import useAlbumApi from '@/api/useAlbum.api';
import useTrackAPI from '@/api/useTrack.api';
import WrapperTrack from '@/components/Wrapper/WrapperTrack';
import CardTrackManage from '@/components/Card/Track/CardTrackManage';
import FormTrackFull from '@/components/Form/FormTrackFull';
import styles from './index.module.scss';

interface IaProps {
  data: IAlbum;
}

function Index({ data: album }: IaProps) {
  const router = useRouter();
  const { getAlbumTracks } = useAlbumApi();
  const { deleteTrack, updateTrack } = useTrackAPI();
  return (
    <div className={styles.content}>
      {album?.image && (
        <Image
          src={normalizeImageUrl(album?.image.formattedImageURL)}
          alt={album.title}
          width={200}
          height={200}
        />
      )}
      <div>
        <h1>{album?.title}</h1>
        <Spacer height={20} />
      </div>
      <h2 className={styles.title}>Tracks</h2>
      <Button
        title="Ajouter un Tracks"
        handleClick={() => router.push(`/track/create?albumId=${album.id}`)}
        className="btn__big"
      />
      <Button
        title="Changer l'ordre des tracks"
        handleClick={() => router.push(`/album/${album.id}/order`)}
        className="btn__big"
      />
      <WrapperManageList>
        <ManageList
          Card={CardTrackManage}
          FormEdit={FormTrackFull}
          getDataIdAPI={getAlbumTracks}
          deleteDataAPI={deleteTrack}
          editDataAPI={updateTrack}
          limit={15}
          Wrapper={WrapperTrack}
          id={album.id}
        />
      </WrapperManageList>
    </div>
  );
}

export default Index;
