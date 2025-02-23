import Spacer from '@/components/UI/Spacer';
import Image from 'next/image';
import { IGroup } from '@/types/group';
import normalizeImageUrl from '@/utils/normalizeImageUrl';
import FormAlbumFull from '@/components/Form/FormAlbumFull';
import WrapperAlbum from '@/components/Wrapper/WrapperAlbum';
import CardAlbumManage from '@/components/Card/Album/CardAlbumManage';
import ManageList from '@/components/Manage/ManageList';
import WrapperManageList from '@/components/Wrapper/WrapperManageList';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';
import useAlbumApi from '@/api/useAlbum.api';
import useGroupAPI from '@/api/useGroup.api';
import useArtistAPI from '@/api/useArtist.api';
import WrapperArtist from '@/components/Wrapper/WrapperArtist';
import CardArtistManage from '@/components/Card/Artist/CardArtistManage';
import FormArtistFull from '@/components/Form/FormArtistFull';
import styles from './index.module.scss';

interface IaProps {
  data: IGroup;
}

function CardGroupManageDetails({ data: group }: IaProps) {
  const { deleteAlbum, updateAlbum } = useAlbumApi();
  const { getGroupAlbums, getGroupArtists } = useGroupAPI();
  const { deleteArtist, updateArtist } = useArtistAPI();
  const router = useRouter();

  return (
    <div className={styles.content}>
      {group?.image && (
        <Image
          src={normalizeImageUrl(group?.image.formattedImageURL)}
          alt={group.name}
          width={200}
          height={200}
        />
      )}
      <div>
        <h1>{group?.name}</h1>
        <Spacer height={20} />
      </div>
      <h2 className={styles.title}>Artists</h2>
      <Button
        title="Ajouter un artiste"
        handleClick={() => router.push(`/artist/create?groupId=${group.id}`)}
        className="btn__big"
      />
      <WrapperManageList>
        <ManageList
          Card={CardArtistManage}
          FormEdit={FormArtistFull}
          getDataIdAPI={getGroupArtists}
          deleteDataAPI={deleteArtist}
          editDataAPI={updateArtist}
          limit={15}
          Wrapper={WrapperArtist}
          id={group.id}
        />
      </WrapperManageList>
      <h2 className={styles.title}>Albums</h2>
      <Button
        title="Ajouter un album"
        handleClick={() => router.push(`/group/${group.id}/album/create`)}
        className="btn__big"
      />
      <WrapperManageList>
        <ManageList
          Card={CardAlbumManage}
          FormEdit={FormAlbumFull}
          getDataIdAPI={getGroupAlbums}
          deleteDataAPI={deleteAlbum}
          editDataAPI={updateAlbum}
          limit={15}
          Wrapper={WrapperAlbum}
          id={group.id}
        />
      </WrapperManageList>
    </div>
  );
}

export default CardGroupManageDetails;
