/* react/function-component-definition */
import React, { useState, ChangeEvent, useEffect } from 'react';
import Image from 'next/image';
import useUploadApi from '@/api/useUpload.api';
import normalizeImageUrl from '@/utils/normalizeImageUrl';
import styles from './index.module.scss';

/**
 * Props for the ImageUploader component.
 *
 * @interface ImageUploaderProps
 *
 * @property {boolean} [acceptImagesOnly] - If true, only image files will be accepted.
 * @property {string} label - The label for the file uploader.
 * @property {string} name - The name attribute for the file input.
 * @property {string} [defaultValue] - The default value for the file input.
 * @property {(url: string) => void} onFileUpload - Callback function to handle the file upload, receives the uploaded file URL as a parameter.
 */
interface ImageUploaderProps {
  acceptImagesOnly: boolean;
  label: string;
  name: string;
  defaultValue: string;
  onFileUpload: (url: string) => void;
}

/**
 * ImageUploader Component
 *
 * This component allows users to upload files with optional image-only validation and displays a preview
 * of the selected file. The file is uploaded asynchronously, and the resulting URL is passed to the parent
 * component via the `onFileUpload` callback.
 *
 * @param {ImageUploaderProps} props - The props object for the ImageUploader component.
 * @returns The rendered ImageUploader component.
 */
function ImageUploader({
  acceptImagesOnly = false,
  label,
  name,
  defaultValue,
  onFileUpload,
}: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { uploadImage } = useUploadApi();

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

    // Validate the file type
    if (acceptImagesOnly && !file.type.startsWith('image/')) {
      setError('Seuls les fichiers image sont autorisés');
      setFileName(null);
      setPreviewUrl(null);
      return;
    }

    // Preview the image if the file is an image
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
      setFileName(file.name);
    }

    setLoading(true);

    // convert the file to binary

    try {
      // Replace with your upload function
      const formData = new FormData(); // Créer un objet FormData pour envoyer en multipart/form-data
      formData.append('image', file); // "image" est le nom du champ à envoyer dans l'API (à adapter si nécessaire)

      // Implement actual image upload logic here
      const {
        data: uploadedImage,
        error: uploadError,
        success,
      } = await uploadImage(formData);

      if (!success) {
        setError(uploadError.message || 'Upload failed');
        setPreviewUrl(null);
        return;
      }

      if (success) {
        onFileUpload(uploadedImage); // Pass the uploaded file URL to the parent component
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
    if (defaultValue) setPreviewUrl(defaultValue);
  }, [defaultValue]);

  return (
    <div className={styles.ImageUploader}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <div className={styles.previewContainer}>
        {previewUrl ? (
          <Image
            src={normalizeImageUrl(previewUrl) || ''}
            alt="Preview"
            className={styles.previewImage}
            width={200}
            height={200}
          />
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
          accept={acceptImagesOnly ? 'image/*' : '*'}
        />
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default ImageUploader;
