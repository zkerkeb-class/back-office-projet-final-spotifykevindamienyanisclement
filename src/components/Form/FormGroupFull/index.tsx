import { ChangeEvent } from 'react';
import Input from '@/components/UI/Input';
import normalizeImageUrl from '@/utils/normalizeImageUrl';
import ImageUploader from '@/components/UI/ImageUploader';

interface IFormEventCreate {
  dataForm: any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormGroupFull({
  dataForm,
  handleChange,
  handleImage,
}: IFormEventCreate) {
  return (
    <>
      <Input
        label="Nom du groupe"
        type="text"
        name="name"
        max={40}
        placeholder="Veuillez saisir le nom du groupe"
        isRequired
        onChange={(e: any) => handleChange(e)}
        value={dataForm?.name}
      />
      <ImageUploader
        label="Image du groupe"
        name="image"
        acceptImagesOnly
        defaultValue={normalizeImageUrl(dataForm?.image?.formattedImageURL)}
        onFileUpload={(file: any) => {
          const image = {
            target: {
              name: 'image',
              value: file,
            },
          } as ChangeEvent<HTMLInputElement>;
          handleChange(image);
          const imageId = {
            target: {
              name: 'imageId',
              value: file.id,
            },
          } as ChangeEvent<HTMLInputElement>;
          handleChange(imageId);
        }}
      />
    </>
  );
}

export default FormGroupFull;
