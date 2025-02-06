import Spacer from '@/components/UI/Spacer';
import Image from 'next/image';
import { ITrackFull } from '@/types/track';
import normalizeImageUrl from '@/utils/normalizeImageUrl';
import styles from './index.module.scss';

interface IaProps {
  data: ITrackFull;
}

function CardTrackManageDetails({ data: track }: IaProps) {
  return (
    <div className={styles.content}>
      {track.album?.image && (
        <Image
          src={normalizeImageUrl(track?.album.image.formattedImageURL)}
          alt={track.title}
          width={200}
          height={200}
        />
      )}
      <div className={styles.top}>
        <h1>{track.title}</h1>
        <Spacer height={20} />
      </div>
    </div>
  );
}

export default CardTrackManageDetails;
