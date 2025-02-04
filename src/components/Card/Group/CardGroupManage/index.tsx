'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IGroup } from '@/types/group';
import styles from './index.module.scss';

interface IaProps {
  data: IGroup;
}

function Index({ data: group }: IaProps) {
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      router.push(`/group/${group?.id}`);
    }
  };

  return (
    <div
      className={styles.group}
      onClick={() => router.push(`/group/${group?.id}`)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.img_div}>
        {group.image && (
          <Image
            src={group.image.formattedImageURL}
            alt={group?.name}
            className={styles.img}
            width={200}
            height={200}
          />
        )}

        <div className={styles.text}>
          <h1>{group?.name}</h1>
        </div>
      </div>
    </div>
  );
}

export default Index;
