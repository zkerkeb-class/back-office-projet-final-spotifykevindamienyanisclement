import Spacer from '@/components/UI/Spacer';
import Image from 'next/image';
import { IAlbum } from '@/types/album';
import styles from './index.module.scss';

interface IaProps {
  data: IAlbum;
}

function Index({ data: album }: IaProps) {
  return (
    <div className={styles.content}>
      {album?.image && (
        <Image
          src={album.image.formattedImageURL}
          alt={album.title}
          width={200}
          height={200}
        />
      )}
      <div className={styles.top}>
        <h1>{album?.title}</h1>
        <Spacer height={20} />
      </div>
    </div>
  );
}

export default Index;
