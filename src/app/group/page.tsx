'use client';

import useGroupApi from '@/api/useGroup.api';
import ManageList from '@/components/Manage/ManageList';
import CardGroupManage from '@/components/Card/Group/CardGroupManage';
import WrapperGroup from '@/components/Wrapper/WrapperGroup';
import FormGroupFull from '@/components/Form/FormGroupFull';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';

function Index() {
  const { getGroups, deleteGroup, updateGroup } = useGroupApi();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Manage Groups</h1>
      <Button
        title="Create Group"
        className="btn__big"
        handleClick={() => router.push('/group/create')}
        type="button"
      />
      <ManageList
        Card={CardGroupManage}
        FormEdit={FormGroupFull}
        getDataAPI={getGroups}
        // createDataAPI={createGroup}
        deleteDataAPI={deleteGroup}
        editDataAPI={updateGroup}
        limit={15}
        Wrapper={WrapperGroup}
      />
    </div>
  );
}

export default Index;
