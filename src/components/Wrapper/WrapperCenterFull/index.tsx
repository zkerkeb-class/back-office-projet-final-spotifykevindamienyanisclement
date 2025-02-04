import React from 'react';
import styles from './index.module.scss';

interface IWrapperCenterFull {
  children: React.ReactNode;
}

function Index({ children }: IWrapperCenterFull) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default Index;
