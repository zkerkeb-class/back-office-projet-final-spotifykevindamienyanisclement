'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/UI/Button/';

import WrapperCenter from '@/components/Wrapper/WrapperCenter';
import CreateItem from '@/components/Manage/CreateItem';
import FormAlbumFull from '@/components/Form/FormAlbumFull';
import useAlbumApi from '@/api/useAlbum.api';
import { IAlbumCreate } from '@/types/album';

function EndPage({ resetForm }: { resetForm: () => void }) {
  const artistId = useSearchParams().get('artistId');
  const groupId = useSearchParams().get('groupId');
  const router = useRouter();

  const handleClick = () => {
    if (artistId) {
      router.push(`/artist/${artistId}`);
    } else if (groupId) {
      router.push(`/group/${groupId}`);
    } else {
      router.push('/album');
    }
  };

  return (
    <WrapperCenter>
      <p>Felicitations, Votre album a été créé avec succès !</p>
      <Button
        title="Retour à la liste des albums"
        className="btn__big"
        handleClick={handleClick}
        type="button"
      />
      <Button
        title="Créer un autre événement"
        className="btn__big__secondary"
        handleClick={() => resetForm()}
        type="button"
      />
    </WrapperCenter>
  );
}

function CreateAlbum() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { createAlbum } = useAlbumApi();
  const [formData, setFormData] = useState<IAlbumCreate>({
    title: '',
    image: null,
    imageId: 0,
    artistId: searchParams.get('artistId')
      ? parseInt(searchParams.get('artistId') as string)
      : null,
    // groupId: searchParams.get('groupId') ? parseInt(searchParams.get('groupId') as string) : null,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      image: null,
      imageId: 0,
      artistId: searchParams.get('artistId')
        ? parseInt(searchParams.get('artistId') as string)
        : null,
      // groupId: searchParams.get('groupId') ? parseInt(searchParams.get('groupId') as string) : null,
    });
    router.refresh();
  };

  const conditions = [
    () => {
      if (!formData.title) {
        return Error('Le nom de la album est obligatoire');
      }
      if (!formData.imageId) {
        return Error("L'image de la album est obligatoire");
      }
    },
  ];

  const Forms = [FormAlbumFull];

  return (
    <div>
      <h1>Créer une album</h1>
      <CreateItem
        conditions={conditions}
        resetForm={resetForm}
        setDataForm={setFormData}
        dataForm={formData}
        Forms={Forms}
        EndPage={EndPage}
        createItemFunc={createAlbum}
      />
    </div>
  );
}

export default CreateAlbum;
