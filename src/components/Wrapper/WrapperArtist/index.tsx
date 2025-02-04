import React from 'react';
import styles from './index.module.scss';

interface IWrapperArtist {
  children: React.ReactNode;
}

function Index({ children }: IWrapperArtist) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default Index;
