'use client';

import React, { FC, useEffect, useCallback } from 'react';
import Loading from '@/components/UI/Loading';
import WrapperCenter from '@/components/Wrapper/WrapperCenter';
import Spacer from '@/components/UI/Spacer';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Button from '@/components/UI/Button';

interface IFlatlist {
  setDataArray: any;
  setPage: any;
  setHasMore: any;
  dataArray: any;
  page: any;
  hasMore: any;
  loading: any;
  error: any;
  Wrapper: FC<any>;
  Card: FC<any>;
  retry: any;
}

// Déplacer ShowBlank en dehors du composant Index
function ShowBlank() {
  return (
    <WrapperCenter>
      <Spacer height={20} />
      Aucun résultat trouvé.
    </WrapperCenter>
  );
}

function Index({
  setDataArray,
  setPage,
  setHasMore,
  dataArray,
  page,
  hasMore,
  loading,
  error,
  Wrapper,
  Card,
  retry,
}: IFlatlist) {
  // Définir handleScroll avant son utilisation
  const handleScroll = () => {
    if (
      document.body.scrollHeight - 300 < window.scrollY + window.innerHeight &&
      hasMore &&
      !loading &&
      !error
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const listener = handleScroll;
    window.addEventListener('scroll', listener);

    return () => window.removeEventListener('scroll', listener);
  }, [dataArray]);

  return (
    <PullToRefresh
      onRefresh={async () => {
        setDataArray([]);
        setHasMore(true);
        setPage(-1);
      }}
    >
      <Wrapper>
        {dataArray.length === 0 && <ShowBlank />}
        {/* <Spacer height={20} /> */}
        {dataArray.map((data: any) => (
          <Card key={data.id} data={data} />
        ))}
        {/* <div className={styles.btn_div}>
                    {hasMore && dataArray.length !== 0 && (
                        <Button
                            handleClick={() => setPage(page + 1)}
                            title="Voir plus"
                            className="btn__primary"
                            type="button"
                        />
                    )}
                </div> */}
        {loading && (
          <WrapperCenter>
            <Loading isLoad color="black" width={40} height={40} />
          </WrapperCenter>
        )}
        {error && (
          <WrapperCenter>
            <Spacer height={20} />
            <p>Une erreur est survenue lors de la récupération des données.</p>
            <Spacer height={10} />
            <Button
              title="Réessayer"
              className="btn__important"
              type="button"
              handleClick={() => {
                retry();
              }}
              loading={loading}
            />
            <Spacer height={20} />
          </WrapperCenter>
        )}
        {!hasMore && <Spacer height={100} />}
      </Wrapper>
    </PullToRefresh>
  );
}

export default Index;
