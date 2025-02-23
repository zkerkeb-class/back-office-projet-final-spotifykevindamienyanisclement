'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './index.module.scss';

function Index() {
  const pathname = usePathname();

  return (
    pathname !== '/login' && (
      <>
        <div className={styles.header_height} />
        <div className={styles.header}>
          <Link className={styles.link} href="/">
            <Image
              src="/spotify-full-logo.svg"
              alt="Spotify"
              width={140}
              height={40}
            />
          </Link>
        </div>
      </>
    )
  );
}

export default Index;
