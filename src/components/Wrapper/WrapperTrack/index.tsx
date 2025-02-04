import React from 'react';
import styles from './index.module.scss';

interface IWrapperTrack {
  children: React.ReactNode;
}

function Index({ children }: IWrapperTrack) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default Index;
