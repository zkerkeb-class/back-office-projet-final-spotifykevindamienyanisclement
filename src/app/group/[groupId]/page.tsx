'use client';

import { useParams } from 'next/navigation';
import useGroupApi from '@/api/useGroup.api';
import ManageItem from '@/components/Manage/ManageItem';
import CardGroupManageDetails from '@/components/Card/Group/CardGroupManageDetails';
import FormGroupFull from '@/components/Form/FormGroupFull';
import { IGroup } from '@/types/group';

function Index() {
  const params = useParams<{ groupId: string }>();
  const { getGroupDetails, createGroup, deleteGroup, updateGroup } =
    useGroupApi();

  return (
    <div>
      <ManageItem<IGroup>
        Card={CardGroupManageDetails}
        getDataAPI={(groupId: string | number) =>
          getGroupDetails(groupId?.toString())
        }
        createDataAPI={createGroup}
        editDataAPI={updateGroup}
        deleteDataAPI={deleteGroup}
        FormEdit={FormGroupFull}
        id={params.groupId}
      />
    </div>
  );
}

export default Index;
