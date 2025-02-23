/* react/function-component-definition */
import React, { useState, ChangeEvent, useEffect } from 'react';
import useUploadApi from '@/api/useUpload.api';
import normalizeSoundUrl from '@/utils/normalizeSoundUrl';
import ReactAudioPlayer from 'react-audio-player';
import styles from './index.module.scss';

/**
 * Props for the SoundUploader component.
 *
 * @interface SoundUploaderProps
 *
 * @property {boolean} [acceptSoundsOnly] - If true, only sound files will be accepted.
 * @property {string} label - The label for the file uploader.
 * @property {string} name - The name attribute for the file input.
 * @property {string} [defaultValue] - The default value for the file input.
 * @property {(url: string) => void} onFileUpload - Callback function to handle the file upload, receives the uploaded file URL as a parameter.
 */
interface SoundUploaderProps {
  acceptSoundsOnly: boolean;
  label: string;
  name: string;
  defaultValue: string;
  onFileUpload: (url: string) => void;
}

/**
 * SoundUploader Component
 *
 * This component allows users to upload files with optional sound-only validation and displays a preview
 * of the selected file. The file is uploaded asynchronously, and the resulting URL is passed to the parent
 * component via the `onFileUpload` callback.
 *
 * @param {SoundUploaderProps} props - The props object for the SoundUploader component.
 * @returns The rendered SoundUploader component.
 */
function SoundUploader({
  acceptSoundsOnly = false,
  label,
  name,
  defaultValue,
  onFileUpload,
}: SoundUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { uploadAudio } = useUploadApi();

  /**
   * Handles the file input change event.
   * Validates the file, displays a preview, and uploads it asynchronously.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The change event triggered by the file input.
   * @returns A promise that resolves when the file upload process is complete.
   */
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      setError('No file selected');
      setPreviewUrl(null);
      setFileName(null);
      return;
    }
    setError(null);
    setLoading(true);

    const file = e.target.files[0];
    console.log(file.type);
    // Validate the file type
    if (acceptSoundsOnly && !file.type.startsWith('audio/')) {
      setError('Seuls les fichiers sound sont autorisés');
      setFileName(null);
      setPreviewUrl(null);
      setLoading(false);
      return;
    }

    // Preview the sound if the file is an sound
    if (file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
      setFileName(file.name);
    }

    // convert the file to binary

    try {
      // Replace with your upload function
      const formData = new FormData(); // Créer un objet FormData pour envoyer en multipart/form-data
      formData.append('audio', file); // "sound" est le nom du champ à envoyer dans l'API (à adapter si nécessaire)

      // Implement actual sound upload logic here
      const {
        data: uploadedsound,
        error: uploadError,
        success,
      } = await uploadAudio(formData);

      if (!success) {
        setError(uploadError.message || 'Upload failed');
        console.log(uploadError);
        setPreviewUrl(null);
        return;
      }

      if (success) {
        console.log(uploadedsound);
        onFileUpload(uploadedsound); // Pass the uploaded file URL to the parent component
        setError(null);
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('normalizeSoundUrl(previewUrl)', normalizeSoundUrl(previewUrl));
  }, [previewUrl]);

  useEffect(() => {
    if (defaultValue) setPreviewUrl(defaultValue);
  }, [defaultValue]);

  return (
    <div className={styles.SoundUploader}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.previewContainer}>
        {previewUrl ? (
          <>
            <ReactAudioPlayer src={normalizeSoundUrl(previewUrl)} controls />
            <a href={normalizeSoundUrl(previewUrl)}> Download audio </a>
          </>
        ) : (
          <p className={styles.placeholder}>
            {fileName || 'Aucun fichier sélectionné'}
          </p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor={name} className={styles.label}>
          {loading ? 'Chargement...' : 'Choisir un fichier'}
        </label>
        <input
          type="file"
          id={name}
          name={name}
          className={styles.input}
          onChange={handleFileUpload}
          accept={acceptSoundsOnly ? 'audio/*' : '*'}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default SoundUploader;
