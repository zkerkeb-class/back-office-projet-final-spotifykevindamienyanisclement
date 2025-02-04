import React from 'react';
import styles from './index.module.scss';

interface IWrapperUser {
  children: React.ReactNode;
}

function Index({ children }: IWrapperUser) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default Index;
