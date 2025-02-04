'use client';

import useUserApi from '@/api/useUser.api';
import ManageList from '@/components/Manage/ManageList';
import CardUserManage from '@/components/Card/User/CardUserManage';
import WrapperUser from '@/components/Wrapper/WrapperUser';
import FormUserFull from '@/components/Form/FormUserFull';
import { IUser } from '@/types/user';

function Index() {
  const { getUsers, createUser, deleteUser, updateUser } = useUserApi();

  return (
    <ManageList
      Card={CardUserManage}
      FormEdit={FormUserFull}
      getDataAPI={getUsers}
      // createDataAPI={createUser}
      deleteDataAPI={deleteUser}
      editDataAPI={updateUser}
      limit={10}
      Wrapper={WrapperUser}
      // textTitle="Liste des utilisateurs"
    />
  );
}

export default Index;
