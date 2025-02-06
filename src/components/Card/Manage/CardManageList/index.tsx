import React, { FC, useEffect } from 'react';
import Button from '@/components/UI/Button';
import Spacer from '@/components/UI/Spacer';
import styles from './index.module.scss';

interface IFullCard {
  data: any;
  Card: any;
  setEditData: (value: any) => void;
  setDeleteData: (value: any) => void;
  setIsEditModalOpen: (value: boolean) => void;
  setIsDeleteModalOpen: (value: boolean) => void;
}

function CardManageList({
  data,
  Card,
  setEditData,
  setDeleteData,
  setIsEditModalOpen,
  setIsDeleteModalOpen,
}: IFullCard) {
  return (
    <>
      <div key={data.id} className={styles.card}>
        <Card data={data} />
        <div className={styles.btn_div}>
          <Button
            title="Modifier"
            className="btn__primary"
            handleClick={() => {
              setIsEditModalOpen(true);
              setEditData(data);
            }}
            type="button"
          />
          <Button
            title="Supprimer"
            className="btn__primary"
            handleClick={() => {
              setIsDeleteModalOpen(true);
              setDeleteData(data);
            }}
            type="button"
          />
        </div>
      </div>
      <Spacer height={10} />
    </>
  );
}

export default CardManageList;
