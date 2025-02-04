import { ChangeEvent } from 'react';
import Input from '@/components/UI/Input';
import Image from 'next/image';

interface IFormEventCreate {
  dataForm: any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormUserFull({
  dataForm,
  handleChange,
  handleImage,
}: IFormEventCreate) {
  return (
    <>
      <Input
        label="Nom de l'utilisateur"
        type="text"
        name="name"
        max={40}
        placeholder="Veuillez saisir le nom de l'utilisateur"
        isRequired
        onChange={(e: any) => handleChange(e)}
        value={dataForm?.name}
      />
      <Input
        label="Image de l'utilisateur"
        type="file"
        accept="image/*"
        name="image"
        placeholder="Veuillez saisir l'image de l'utilisateur"
        onChange={(e: any) => handleImage(e)}
        value=""
      />
      {dataForm?.image && (
        <Image
          src={dataForm?.image}
          alt="image de l'utilisateur"
          style={{ width: '100px' }}
        />
      )}
    </>
  );
}

export default FormUserFull;
