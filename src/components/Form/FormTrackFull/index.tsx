import { ChangeEvent } from 'react';
import Input from '@/components/UI/Input';
import normalizeImageUrl from '@/utils/normalizeImageUrl';
import FileUploader from '@/components/UI/FileUploader';

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
      <FileUploader
        label="Image du track"
        name="image"
        acceptImagesOnly
        defaultValue={normalizeImageUrl(dataForm?.image.formattedImageURL)}
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

export default FormTrackFull;
