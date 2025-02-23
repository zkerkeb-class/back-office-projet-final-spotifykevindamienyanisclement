'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button/';

import WrapperCenter from '@/components/Wrapper/WrapperCenter';
import CreateItem from '@/components/Manage/CreateItem';
import FormGroupFull from '@/components/Form/FormGroupFull';
import useGroupApi from '@/api/useGroup.api';
import { IGroupCreate } from '@/types/group';

function EndPage({ resetForm }: { resetForm: () => void }) {
  const router = useRouter();
  return (
    <WrapperCenter>
      <p>Felicitations, Votre groupe a été créé avec succès !</p>
      <Button
        title="Retour à la liste des groupes"
        className="btn__big"
        handleClick={() => router.push('/group')}
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

function CreateGroup() {
  const router = useRouter();
  const { createGroup } = useGroupApi();
  const [formData, setFormData] = useState<IGroupCreate>({
    name: '',
    imageId: 0,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      imageId: 0,
    });
    router.refresh();
  };

  const conditions = [
    () => {
      if (!formData.name) {
        return Error('Le nom de la groupe est obligatoire');
      }
      if (!formData.imageId) {
        return Error("L'image de la groupe est obligatoire");
      }
    },
  ];

  const Forms = [FormGroupFull];

  return (
    <div>
      <h1>Créer une groupe</h1>
      <CreateItem
        conditions={conditions}
        resetForm={resetForm}
        setDataForm={setFormData}
        dataForm={formData}
        Forms={Forms}
        EndPage={EndPage}
        createItemFunc={createGroup}
      />
    </div>
  );
}

export default CreateGroup;
