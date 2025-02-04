import React from 'react';
import styles from './index.module.scss';

interface IWrapperGroup {
  children: React.ReactNode;
}

function Index({ children }: IWrapperGroup) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default Index;
