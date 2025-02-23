'use client';

import useUserApi from '@/api/useUser.api';
import ManageList from '@/components/Manage/ManageList';
import CardUserManage from '@/components/Card/User/CardUserManage';
import WrapperUser from '@/components/Wrapper/WrapperUser';
import FormUserFull from '@/components/Form/FormUserFull';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';

function Index() {
  const { getUsers, deleteUser, updateUser } = useUserApi();
  const router = useRouter();

  return (
    <div>
      <h1>Manage User</h1>
      <Button
        title="Create User"
        className="btn__big"
        handleClick={() => router.push('/user/create')}
        type="button"
      />
      <ManageList
        Card={CardUserManage}
        FormEdit={FormUserFull}
        getDataAPI={getUsers}
        // createDataAPI={createUser}
        deleteDataAPI={deleteUser}
        editDataAPI={updateUser}
        limit={15}
        Wrapper={WrapperUser}
      />
    </div>
  );
}

export default Index;
