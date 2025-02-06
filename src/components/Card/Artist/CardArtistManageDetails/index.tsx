import Spacer from '@/components/UI/Spacer';
import Image from 'next/image';
import { IArtist } from '@/types/artist';
import normalizeImageUrl from '@/utils/normalizeImageUrl';
import styles from './index.module.scss';

interface IaProps {
  data: IArtist;
}

function Index({ data: artist }: IaProps) {
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
      <div className={styles.top}>
        <h1>{artist?.name}</h1>
        <Spacer height={20} />
      </div>
    </div>
  );
}

export default Index;
