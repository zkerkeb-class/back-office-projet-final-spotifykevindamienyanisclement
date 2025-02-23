'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/UI/Button/';

import WrapperCenter from '@/components/Wrapper/WrapperCenter';
import CreateItem from '@/components/Manage/CreateItem';
import FormTrackFull from '@/components/Form/FormTrackFull';
import useTrackApi from '@/api/useTrack.api';
import { ITrackCreate } from '@/types/track';

function EndPage({ resetForm }: { resetForm: () => void }) {
  const router = useRouter();
  const albumId = useSearchParams().get('albumId');
  return (
    <WrapperCenter>
      <p>Felicitations, Votre son a été créé avec succès !</p>
      <Button
        title="Retour à la liste des sons"
        className="btn__big"
        handleClick={() => router.push(`/album/${albumId}`)}
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

function CreateTrack() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createTrack } = useTrackApi();
  const [formData, setFormData] = useState<ITrackCreate>({
    title: '',
    soundId: 0,
    albumId: searchParams.get('albumId')
      ? parseInt(searchParams.get('albumId') as string)
      : 0,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      soundId: 0,
      albumId: searchParams.get('albumId')
        ? parseInt(searchParams.get('albumId') as string)
        : 0,
    });
    router.refresh();
  };

  const conditions = [
    () => {
      if (!formData.title) {
        return Error('Le nom du son est obligatoire');
      }
      if (!formData.soundId) {
        return Error('Le son est obligatoire');
      }
    },
  ];

  const Forms = [FormTrackFull];

  return (
    <div>
      <h1>Créer une son</h1>
      <CreateItem
        conditions={conditions}
        resetForm={resetForm}
        setDataForm={setFormData}
        dataForm={formData}
        Forms={Forms}
        EndPage={EndPage}
        createItemFunc={createTrack}
      />
    </div>
  );
}

export default CreateTrack;
