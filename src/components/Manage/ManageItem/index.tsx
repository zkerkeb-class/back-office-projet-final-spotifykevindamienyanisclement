import React, {
  useEffect,
  useState,
  useCallback,
  FC,
  ChangeEvent,
} from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button';
import Loading from '@/components/UI/Loading';
import Modal from '@/components/UI/Modal';
import WrapperCenter from '@/components/Wrapper/WrapperCenter';
import Spacer from '@/components/UI/Spacer';
import CardManageItem from '@/components/Card/Manage/CardManageItem';
import { IResponse } from '@/types/response';
import EditItem from '../EditItem';

interface IManageItemProps<T> {
  Card: FC<{ data: T }>;
  getDataAPI: (id: string) => Promise<IResponse<T>>;
  editDataAPI: (id: string, data: Partial<T>) => Promise<IResponse<T>>;
  deleteDataAPI: (id: string) => Promise<IResponse<T>>;
  createDataAPI: (data: T) => Promise<IResponse<T>>;
  FormEdit: FC<{
    dataForm: Partial<T>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleImage: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  }>;
  id: string;
}

function ManageItem<T>({
  Card,
  getDataAPI,
  editDataAPI,
  deleteDataAPI,
  createDataAPI,
  FormEdit,
  id,
}: IManageItemProps<T>) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(() => {
    setLoading(true);
    getDataAPI(id).then(
      ({ data: fetchedData, error: fetchError, success }: IResponse<T>) => {
        if (!success || fetchedData === undefined) {
          setLoading(false);
          setError(Error(fetchError));
          return;
        }
        setData(fetchedData);
        setLoading(false);
      }
    );
  }, [id, getDataAPI]);

  const handleDelete = async () => {
    setLoading(true);
    const { success, error: deleteError } = await deleteDataAPI(id);
    if (!success) {
      setError(Error(deleteError));
      setLoading(false);
      return;
    }
    router.back();
  };

  const handleEdit = async (formData: Partial<T>) => {
    setLoading(true);
    const { success, error: editError } = await editDataAPI(id, formData);
    if (!success) {
      setError(Error(editError));
      setLoading(false);
      return;
    }
    setIsOpen(false);
    fetchData();
  };

  const handleCreate = async (formData: Partial<T>) => {
    setLoading(true);
    const { success, error: createError } = await createDataAPI(formData as T);
    if (!success) {
      setError(Error(createError));
      setLoading(false);
      return;
    }
    setIsCreateModalOpen(false);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {loading && (
        <WrapperCenter>
          <Loading isLoad color="#0a0a0a" width={100} height={100} />
        </WrapperCenter>
      )}

      {isOpen && data && (
        <EditItem
          setIsOpen={setIsOpen}
          dataForm={data}
          Form={FormEdit}
          onSubmit={handleEdit}
        />
      )}

      <Modal
        title="Confirmation de suppression"
        closeModal={() => setIsDeleteModalOpen(false)}
        isOpen={isDeleteModalOpen}
      >
        <div>
          <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
          <div className="flex gap-4 justify-end mt-4">
            <Button
              title="Annuler"
              className="btn__secondary"
              handleClick={() => setIsDeleteModalOpen(false)}
              type="button"
            />
            <Button
              title="Supprimer"
              className="btn__important"
              handleClick={handleDelete}
              type="button"
            />
          </div>
        </div>
      </Modal>

      {data && (
        <CardManageItem
          data={data}
          Card={Card}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setIsEditModalOpen={setIsOpen}
        />
      )}

      {error && <div className="text-red-500 mt-4">{error.message}</div>}
      <Spacer height={100} />
    </div>
  );
}

export default ManageItem;
