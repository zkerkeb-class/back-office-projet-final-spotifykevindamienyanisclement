import { ChangeEvent } from 'react';
import Input from '@/components/UI/Input';
import Image from 'next/image';

interface IFormEventCreate {
  dataForm: any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormTrackFull({
  dataForm,
  handleChange,
  handleImage,
}: IFormEventCreate) {
  return (
    <>
      <Input
        label="Nom du track"
        type="text"
        name="name"
        max={40}
        placeholder="Veuillez saisir le nom du track"
        isRequired
        onChange={(e: any) => handleChange(e)}
        value={dataForm?.name}
      />
      <Input
        label="Image du track"
        type="file"
        accept="image/*"
        name="image"
        placeholder="Veuillez saisir l'image du track"
        onChange={(e: any) => handleImage(e)}
        value=""
      />
      {dataForm?.image && (
        <Image
          src={dataForm?.image}
          alt="image du track"
          style={{ width: '100px' }}
        />
      )}
    </>
  );
}

export default FormTrackFull;
