'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button';
import Spacer from '@/components/UI/Spacer';
import styles from './index.module.scss';

interface IFullCard {
  data: any;
  Card: any;
  setIsEditModalOpen: any;
  setIsDeleteModalOpen: any;
}

function Index({
  data,
  Card,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
}: IFullCard) {
  const router = useRouter();
  return (
    <div className={styles.card}>
      <Card data={data} />

      <Spacer height={200} />
      <div className={styles.bottom}>
        <div className={styles.btn_div}>
          <Button
            title="Modifier"
            className="btn__secondary"
            handleClick={() => {
              setIsEditModalOpen(true);
            }}
          />
          <Button
            title="Supprimer"
            className="btn__remove"
            handleClick={() => setIsDeleteModalOpen(true)}
          />
        </div>
      </div>
    </div>
  );
}

export default Index;
