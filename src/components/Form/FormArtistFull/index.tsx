import { ChangeEvent } from 'react';
import Input from '@/components/UI/Input';
import Image from 'next/image';

interface IFormEventCreate {
  dataForm: any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormArtistFull({
  dataForm,
  handleChange,
  handleImage,
}: IFormEventCreate) {
  return (
    <>
      <Input
        label="Nom de l'artiste"
        type="text"
        name="name"
        max={40}
        placeholder="Veuillez saisir le nom de l'artiste"
        isRequired
        onChange={(e: any) => handleChange(e)}
        value={dataForm?.name}
      />
      <Input
        label="Image de l'artiste"
        type="file"
        accept="image/*"
        name="image"
        placeholder="Veuillez saisir l'image de l'artiste"
        onChange={(e: any) => handleImage(e)}
        value=""
      />
      {dataForm?.image && (
        <Image
          src={dataForm?.image}
          alt="image de l'artiste"
          style={{ width: '100px' }}
        />
      )}
    </>
  );
}

export default FormArtistFull;
