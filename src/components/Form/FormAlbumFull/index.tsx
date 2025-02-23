import { ChangeEvent } from 'react';
import Input from '@/components/UI/Input';
import normalizeImageUrl from '@/utils/normalizeImageUrl';
import ImageUploader from '@/components/UI/ImageUploader';

interface IFormEventCreate {
  dataForm: any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormAlbumFull({ dataForm, handleChange }: IFormEventCreate) {
  return (
    <>
      <Input
        label="Titre de l'album"
        type="text"
        name="title"
        max={40}
        placeholder="Veuillez saisir le titre de l'album"
        isRequired
        onChange={(e: any) => handleChange(e)}
        value={dataForm?.title}
      />
      <ImageUploader
        label="Image de l'album"
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

export default FormAlbumFull;
