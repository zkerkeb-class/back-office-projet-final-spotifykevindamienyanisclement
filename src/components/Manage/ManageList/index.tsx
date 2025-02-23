/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */

'use client';

import React, { useEffect, useState, FC } from 'react';
import { IResponse } from '@/interfaces/response.interface';
import FlatList from '@/components/UI/FlatList';
import FullCard from '@/components/Card/Manage/CardManageList';
import EditItem from '@/components/Manage/EditItem';
import Modal from '@/components/UI/Modal';
import Button from '@/components/UI/Button';
import { get } from 'http';

interface IManageList {
  Card: FC<any>;
  getDataAPI?: (limit: number, offset: number) => Promise<any>;
  getDataIdAPI?: (
    limit: number,
    offset: number,
    id: number | string
  ) => Promise<any>;
  editDataAPI: (id: string, data: any) => Promise<any>;
  deleteDataAPI: (id: string) => Promise<any>;
  FormEdit: FC<any>;
  limit: number;
  Wrapper: FC<any>;
  id?: number | string;
}

interface IData {
  data: () => any;
  id: string;
}

function ManageList({
  Card,
  getDataAPI,
  getDataIdAPI,
  editDataAPI,
  deleteDataAPI,
  FormEdit,
  limit,
  Wrapper,
  id,
}: IManageList) {
  const [dataArray, setDataArray] = useState<IData[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState<number>(0);
  const [editData, setEditData] = useState<any>(null);
  const [deleteData, setDeleteData] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const fetchData = async () => {
    if (page === -1) return;
    setLoading(true);
    const offset = page * limit;
    if (id && getDataIdAPI) {
      getDataIdAPI(limit, offset, id).then(
        ({ data, success, code }: IResponse) => {
          if (code === 404 || !success || data?.length === 0) {
            setHasMore(false);
            setLoading(false);
            return;
          }
          // delete duplicate data
          const filteredData = data.filter(
            (item: any) => !dataArray.some(existing => existing.id === item.id)
          );
          if (filteredData.length < limit) setHasMore(false);
          setDataArray([...dataArray, ...data]);
          setLoading(false);
        }
      );
    } else if (getDataAPI) {
      getDataAPI(limit, offset).then(({ data, success, code }: IResponse) => {
        if (code === 404 || !success || data?.length === 0) {
          setHasMore(false);
          setLoading(false);
          return;
        }
        // delete duplicate data
        const filteredData = data.filter(
          (item: any) => !dataArray.some(existing => existing.id === item.id)
        );
        if (filteredData.length < limit) setHasMore(false);
        setDataArray([...dataArray, ...data]);
        setLoading(false);
      });
    }
  };

  useEffect(() => {
    if (page === -1) {
      setPage(0);
      return;
    }
    fetchData();
  }, [page]);

  useEffect(() => {
    if (dataArray.length === 0) {
      fetchData();
    }
  }, [dataArray]);

  const retry = () => {
    setError(null);
    setLoading(true);
    setHasMore(true);
    fetchData();
  };

  const handleDelete = async () => {
    setLoading(true);
    deleteDataAPI(deleteData.id).then(
      ({ error: deleteError, success }: IResponse) => {
        if (success) {
          setDataArray(dataArray.filter(item => item.id !== deleteData.id));
        } else {
          console.error('error : ', deleteError);
          setError(Error('No data found'));
        }
        setIsDeleteModalOpen(false);
        setDeleteData(null);
        setLoading(false);
      }
    );
  };

  const handleEdit = async (data: any) => {
    setLoading(true);
    const { success, error: errorEdit } = await editDataAPI(editData.id, data);
    if (!success) {
      setError(Error(errorEdit));
      setLoading(false);
      return;
    }
    setIsEditModalOpen(false);
    setEditData(null);
    setLoading(false);
    setDataArray([]);
  };

  return (
    <>
      {isEditModalOpen && (
        <EditItem
          setIsOpen={setIsEditModalOpen}
          dataForm={editData}
          Form={FormEdit}
          onSubmit={handleEdit}
        />
      )}

      <Modal
        title="Confirmation de suppression"
        closeModal={() => setIsDeleteModalOpen(false)}
        isOpen={isDeleteModalOpen}
      >
        <div>
          <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
          <div>
            <Button
              title="Annuler"
              className="btn__primary"
              handleClick={() => setIsDeleteModalOpen(false)}
              type="button"
            />
            <Button
              title="Supprimer"
              className="btn__secondary"
              handleClick={() => {
                handleDelete();
              }}
              type="button"
            />
          </div>
        </div>
      </Modal>
      <FlatList
        setDataArray={setDataArray}
        setPage={setPage}
        setHasMore={setHasMore}
        dataArray={dataArray}
        page={page}
        hasMore={hasMore}
        loading={loading}
        error={error}
        Wrapper={Wrapper}
        Card={props => (
          <FullCard
            key={props.id}
            data={props.data}
            Card={Card}
            setEditData={setEditData}
            setDeleteData={setDeleteData}
            setIsEditModalOpen={setIsEditModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
          />
        )}
        retry={retry}
      />
    </>
  );
}

ManageList.defaultProps = {
  getDataAPI: undefined,
  getDataIdAPI: undefined,
  id: undefined,
};

export default ManageList;
