'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IArtist } from '@/types/artist';
import normalizeImageUrl from '@/utils/normalizeImageUrl';
import styles from './index.module.scss';

interface IaProps {
  data: IArtist;
}

function Index({ data: artist }: IaProps) {
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      router.push(`/artist/${artist?.id}`);
    }
  };

  return (
    <div
      className={styles.artist}
      onClick={() => router.push(`/artist/${artist?.id}`)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.img_div}>
        {artist.image && (
          <Image
            src={normalizeImageUrl(artist?.image.formattedImageURL)}
            alt={artist?.name}
            className={styles.img}
            width={200}
            height={200}
          />
        )}

        <div className={styles.card}>
          <div className={styles.text}>
            <h1>{artist?.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
