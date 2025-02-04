import React from 'react';
import styles from './index.module.scss';

interface IWrapperAlbum {
  children: React.ReactNode;
}

function Index({ children }: IWrapperAlbum) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default Index;
