'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IAlbum } from '@/types/album';
import normalizeImageUrl from '@/utils/normalizeImageUrl';
import styles from './index.module.scss';

interface IaProps {
  data: IAlbum;
}

function Index({ data: album }: IaProps) {
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      router.push(`/album/${album?.id}`);
    }
  };

  return (
    <div
      className={styles.album}
      onClick={() => router.push(`/album/${album?.id}`)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.img_div}>
        {album.image && (
          <Image
            src={normalizeImageUrl(album?.image.formattedImageURL)}
            alt={album?.title}
            className={styles.img}
            width={200}
            height={200}
          />
        )}

        <div className={styles.card}>
          <div className={styles.text}>
            <h1>{album?.title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
