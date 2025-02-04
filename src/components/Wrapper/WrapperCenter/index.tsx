import React from 'react';
import styles from './index.module.scss';

interface IWrapperCenter {
  children: React.ReactNode;
}

function Index({ children }: IWrapperCenter) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default Index;
