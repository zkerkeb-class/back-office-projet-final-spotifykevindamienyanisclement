import Spacer from '@/components/UI/Spacer';
import { IUser } from '@/types/user';

interface IaProps {
  data: IUser;
}

function CardUserManageDetails({ data: user }: IaProps) {
  return (
    <div>
      <div>
        <h1>{user?.name}</h1>
        <Spacer height={20} />
      </div>
    </div>
  );
}

export default CardUserManageDetails;
