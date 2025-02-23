import React, { useEffect, useState, useCallback, FC } from 'react';
import Loading from '@/components/UI/Loading';
import WrapperCenterFull from '@/components/Wrapper/WrapperCenterFull';
import Button from '@/components/UI/Button';
import { IResponse } from '@/types/response';

interface IFetchItemById {
  id: string;
  Card: FC<any>;
  getDataAPI: any;
}

function Index({ id, Card, getDataAPI }: IFetchItemById) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    getDataAPI(id).then(
      ({ data: fetchedData, error: fetchError, success }: IResponse) => {
        if (!success) {
          setLoading(false);
          setError(Error(fetchError));
          return;
        }
        setData(fetchedData);
        setLoading(false);
      }
    );
  }, [id, getDataAPI]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const retryFetch = () => {
    setError(null);
    fetchData();
  };

  return (
    <div>
      {loading && (
        <WrapperCenterFull>
          <Loading isLoad color="#0a0a0a" width={40} height={40} />
        </WrapperCenterFull>
      )}
      {error && (
        <WrapperCenterFull>
          <p>Une erreur est survenue lors de la récupération des données.</p>
          <Button
            title="Réessayer"
            className="btn__important"
            type="button"
            handleClick={retryFetch}
          />
        </WrapperCenterFull>
      )}
      {!loading && !error && <Card data={data} />}
    </div>
  );
}

export default Index;
