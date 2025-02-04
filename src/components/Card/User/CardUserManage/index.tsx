'use client';

import { useRouter } from 'next/navigation';
import { IUser } from '@/types/user';
import styles from './index.module.scss';

interface IaProps {
  data: IUser;
}

function CardUserManage({ data: user }: IaProps) {
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      router.push(`/user/${user?.id}`);
    }
  };

  return (
    <div
      className={styles.user}
      onClick={() => router.push(`/user/${user?.id}`)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.img_div}>
        <div className={styles.card}>
          <div className={styles.text}>
            <h1>{user?.name}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardUserManage;
