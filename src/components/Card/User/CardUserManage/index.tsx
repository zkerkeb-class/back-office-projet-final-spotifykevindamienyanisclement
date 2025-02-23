'use client';

import { useRouter } from 'next/navigation';
import { IUser } from '@/types/user';

interface IaProps {
  data: IUser;
}

function CardUserManage({ data: user }: IaProps) {
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      router.push(`/user/${user?.id}`);
    }
  };

  return (
    <div
      onClick={() => router.push(`/user/${user?.id}`)}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div>
        <h1>{user?.name}</h1>
      </div>
    </div>
  );
}

export default CardUserManage;
