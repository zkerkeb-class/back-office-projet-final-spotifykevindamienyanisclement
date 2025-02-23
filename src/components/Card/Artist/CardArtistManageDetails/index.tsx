import Spacer from '@/components/UI/Spacer';
import Image from 'next/image';
import { IArtist } from '@/types/artist';
import normalizeImageUrl from '@/utils/normalizeImageUrl';
import FormAlbumFull from '@/components/Form/FormAlbumFull';
import WrapperAlbum from '@/components/Wrapper/WrapperAlbum';
import CardAlbumManage from '@/components/Card/Album/CardAlbumManage';
import ManageList from '@/components/Manage/ManageList';
import WrapperManageList from '@/components/Wrapper/WrapperManageList';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';
import useAlbumApi from '@/api/useAlbum.api';
import useArtistAPI from '@/api/useArtist.api';
import styles from './index.module.scss';

interface IaProps {
  data: IArtist;
}

function Index({ data: artist }: IaProps) {
  const { deleteAlbum, updateAlbum } = useAlbumApi();
  const { getArtistAlbums } = useArtistAPI();
  const router = useRouter();
  return (
    <div className={styles.content}>
      {artist?.image && (
        <Image
          src={normalizeImageUrl(artist?.image.formattedImageURL)}
          alt={artist.name}
          width={200}
          height={200}
        />
      )}
      <div>
        <h1>{artist?.name}</h1>
        <Spacer height={20} />
      </div>
      <h2 className={styles.title}>Albums</h2>
      <Button
        title="Ajouter un album"
        handleClick={() => router.push(`/album/create?artistId=${artist.id}`)}
        className="btn__big"
      />
      <WrapperManageList>
        <ManageList
          Card={CardAlbumManage}
          FormEdit={FormAlbumFull}
          getDataIdAPI={getArtistAlbums}
          deleteDataAPI={deleteAlbum}
          editDataAPI={updateAlbum}
          limit={15}
          Wrapper={WrapperAlbum}
          id={artist.id}
        />
      </WrapperManageList>
    </div>
  );
}

export default Index;
