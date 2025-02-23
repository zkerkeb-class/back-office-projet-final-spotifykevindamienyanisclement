'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/UI/Button/';

import WrapperCenter from '@/components/Wrapper/WrapperCenter';
import CreateItem from '@/components/Manage/CreateItem';
import FormArtistFull from '@/components/Form/FormArtistFull';
import useArtistApi from '@/api/useArtist.api';
import { IArtistCreate } from '@/types/artist';

function EndPage({ resetForm }: { resetForm: () => void }) {
  const router = useRouter();
  return (
    <WrapperCenter>
      <p>Felicitations, Votre artiste a été créé avec succès !</p>
      <Button
        title="Retour à la liste des artistes"
        className="btn__big"
        handleClick={() => router.push('/artist')}
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

function CreateArtist() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { createArtist } = useArtistApi();
  const [formData, setFormData] = useState<IArtistCreate>({
    name: '',
    imageId: 0,
    groupId: searchParams.get('groupId')
      ? parseInt(searchParams.get('groupId') as string)
      : null,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      imageId: 0,
      groupId: searchParams.get('groupId')
        ? parseInt(searchParams.get('groupId') as string)
        : null,
    });
    router.refresh();
  };

  const conditions = [
    () => {
      if (!formData.name) {
        return Error('Le nom de la Artiste est obligatoire');
      }
      if (!formData.imageId) {
        return Error("L'image de la Artiste est obligatoire");
      }
    },
  ];

  const Forms = [FormArtistFull];

  return (
    <div>
      <h1>Créer une artiste</h1>
      <CreateItem
        conditions={conditions}
        resetForm={resetForm}
        setDataForm={setFormData}
        dataForm={formData}
        Forms={Forms}
        EndPage={EndPage}
        createItemFunc={createArtist}
      />
    </div>
  );
}

export default CreateArtist;
