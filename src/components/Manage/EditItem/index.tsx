import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Modal from '@/components/UI/Modal';
import Button from '@/components/UI/Button';
import Loading from '@/components/UI/Loading';
import useUploadApi from '@/api/useUpload.api';

interface IEdit<T = Record<string, unknown>> {
  setIsOpen: (value: boolean) => void;
  dataForm: Partial<T>;
  Form: React.FC<{
    dataForm: Partial<T>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  }>;
  onSubmit: (data: Partial<T>) => void;
}

function EditItem<T>({ setIsOpen, dataForm, Form, onSubmit }: IEdit<T>) {
  const [formData, setFormData] = useState<Partial<T>>(dataForm);
  const [loading, setLoading] = useState(false);
  const { uploadImage } = useUploadApi();

  useEffect(() => {
    setFormData(dataForm);
  }, [dataForm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.type === 'datetime-local'
        ? new Date(e.target.value)
        : e.target.value;

    setFormData(prev => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setLoading(true);
    const file = e.target.files[0]; // Récupérer le fichier sélectionné
    if (!file) return; // Sortir si aucun fichier n'est sélectionné
    try {
      const formDataUpload = new FormData(); // Créer un objet FormData pour envoyer en multipart/form-data
      formDataUpload.append('image', file); // "image" est le nom du champ à envoyer dans l'API (à adapter si nécessaire)
      console.log(formDataUpload);
      // Implement actual image upload logic here
      const {
        data: uploadedImage,
        error,
        success,
        code,
      } = await uploadImage(formDataUpload);

      if (!success || !uploadedImage || code !== 200) {
        console.error('Failed to upload image', error);
        return;
      }
      setFormData(prev => ({
        ...prev,
        image: uploadedImage,
        imageId: uploadedImage.id,
      }));
    } finally {
      setLoading(false);
    }
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal title="Edit Item" closeModal={() => setIsOpen(false)} isOpen>
      {loading ? (
        <Loading isLoad />
      ) : (
        <form onSubmit={submitForm}>
          <Form
            dataForm={formData}
            handleChange={handleChange}
            handleImage={handleImage}
          />
          <Button type="submit" title="Modifier" className="btn__big" />
        </form>
      )}
    </Modal>
  );
}

export default EditItem;
