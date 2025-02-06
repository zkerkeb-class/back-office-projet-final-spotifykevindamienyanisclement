import Spacer from '@/components/UI/Spacer';
import Image from 'next/image';
import { IGroup } from '@/types/group';
import normalizeImageUrl from '@/utils/normalizeImageUrl';
import styles from './index.module.scss';

interface IaProps {
  data: IGroup;
}

function CardGroupManageDetails({ data: group }: IaProps) {
  return (
    <div className={styles.content}>
      {group?.image && (
        <Image
          src={normalizeImageUrl(group?.image.formattedImageURL)}
          alt={group.name}
          width={200}
          height={200}
        />
      )}
      <div className={styles.top}>
        <h1>{group?.name}</h1>
        <Spacer height={20} />
      </div>
    </div>
  );
}

export default CardGroupManageDetails;
