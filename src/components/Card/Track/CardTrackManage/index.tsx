'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ITrackFull } from '@/types/track';
import normalizeImageUrl from '@/utils/normalizeImageUrl';
import styles from './index.module.scss';

interface IaProps {
  data: ITrackFull;
}

function CardTrackManage({ data: track }: IaProps) {
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      router.push(`/track/${track?.id}`);
    }
  };

  return (
    <div
      className={styles.track}
      onClick={() => router.push(`/track/${track?.id}`)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.img_div}>
        {track.album?.image && (
          <Image
            src={normalizeImageUrl(track?.album.image.formattedImageURL)}
            alt={track?.title}
            className={styles.img}
            width={200}
            height={200}
          />
        )}
        <div className={styles.text}>
          <h1>{track?.title}</h1>
        </div>
      </div>
    </div>
  );
}

export default CardTrackManage;
