import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

interface IWrapperTrack {
  children: React.ReactNode;
}

function Index({ children }: IWrapperTrack) {
  const router = useRouter();

  return <div className={styles.dashboard_wrapper}>{children}</div>;
}

export default Index;
