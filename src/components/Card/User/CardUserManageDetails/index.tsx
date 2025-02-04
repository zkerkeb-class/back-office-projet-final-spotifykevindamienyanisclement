import Spacer from '@/components/UI/Spacer';
import { IUser } from '@/types/user';
import styles from './index.module.scss';

interface IaProps {
  data: IUser;
}

function CardUserManageDetails({ data: user }: IaProps) {
  return (
    <div className={styles.content}>
      <div className={styles.top}>
        <h1>{user?.name}</h1>
        <Spacer height={20} />
      </div>
    </div>
  );
}

export default CardUserManageDetails;
