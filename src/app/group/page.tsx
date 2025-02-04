'use client';

import useGroupApi from '@/api/useGroup.api';
import ManageList from '@/components/Manage/ManageList';
import CardGroupManage from '@/components/Card/Group/CardGroupManage';
import WrapperGroup from '@/components/Wrapper/WrapperGroup';
import FormGroupFull from '@/components/Form/FormGroupFull';
import { IGroup } from '@/types/group';

function Index() {
  const { getGroups, createGroup, deleteGroup, updateGroup } = useGroupApi();

  return (
    <ManageList
      Card={CardGroupManage}
      FormEdit={FormGroupFull}
      getDataAPI={getGroups}
      // createDataAPI={createGroup}
      deleteDataAPI={deleteGroup}
      editDataAPI={updateGroup}
      limit={10}
      Wrapper={WrapperGroup}
      // textTitle="Mes Groupes"
    />
  );
}

export default Index;
