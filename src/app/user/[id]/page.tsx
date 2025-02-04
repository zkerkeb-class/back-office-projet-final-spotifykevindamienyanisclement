'use client';

import { useParams } from 'next/navigation';
import useUserApi from '@/api/useUser.api';
import ManageItem from '@/components/Manage/ManageItem';
import CardUserManageDetails from '@/components/Card/User/CardUserManageDetails';
import FormUserFull from '@/components/Form/FormUserFull';
import { IUser } from '@/types/user';

function Index() {
  const params = useParams<{ id: string }>();
  const { getUserDetails, createUser, deleteUser, updateUser } = useUserApi();

  return (
    <div>
      <ManageItem<IUser>
        Card={CardUserManageDetails}
        getDataAPI={(id: string | number) => getUserDetails(id.toString())}
        createDataAPI={createUser}
        editDataAPI={updateUser}
        deleteDataAPI={deleteUser}
        FormEdit={FormUserFull}
        id={params.id}
      />
    </div>
  );
}

export default Index;
