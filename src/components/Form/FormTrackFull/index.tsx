import { ChangeEvent } from 'react';
import Input from '@/components/UI/Input';
import normalizeSoundUrl from '@/utils/normalizeSoundUrl';
import SoundUploader from '@/components/UI/SoundUploader';

interface IFormEventCreate {
  dataForm: any;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function FormTrackFull({ dataForm, handleChange }: IFormEventCreate) {
  return (
    <>
      <Input
        label="Nom du track"
        type="text"
        name="title"
        max={40}
        placeholder="Veuillez saisir le nom du track"
        isRequired
        onChange={(e: any) => handleChange(e)}
        value={dataForm?.title}
      />
      <SoundUploader
        label="Sound du track"
        name="Sound"
        acceptSoundsOnly
        defaultValue={normalizeSoundUrl(dataForm?.sound?.formattedSoundURL)}
        onFileUpload={(file: any) => {
          const Sound = {
            target: {
              name: 'Sound',
              value: file,
            },
          } as ChangeEvent<HTMLInputElement>;
          handleChange(Sound);
          const soundId = {
            target: {
              name: 'soundId',
              value: file.id,
            },
          } as ChangeEvent<HTMLInputElement>;
          handleChange(soundId);
        }}
      />
    </>
  );
}

export default FormTrackFull;
