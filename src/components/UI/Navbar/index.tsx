'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './index.module.scss';

function Index() {
  const pathname = usePathname();

  return (
    pathname !== '/login' && (
      <>
        <div className={styles.nav_width} />
        <div className={styles.navbar}>
          <Link className={styles.link} href="/">
            Dashboard
          </Link>
          {/* <Link className={styles.link} href="/user">
            Users
          </Link> */}
          <Link className={styles.link} href="/artist">
            Artists
          </Link>
          <Link className={styles.link} href="/group">
            Groupes
          </Link>
          <Link className={styles.link} href="/album">
            Albums
          </Link>
          <Link className={styles.link} href="/track">
            Tracks
          </Link>
        </div>
      </>
    )
  );
}

export default Index;
