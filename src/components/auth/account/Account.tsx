import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getCurrentUser } from '@/lib/fetchData/getCurrentUser';
import { getServerSession } from 'next-auth';
import EditUsername from './EditUsername';
import ChangePassword from '../password/ChangePassword';
import styles from './Account.module.css'

export default async function Account() {
  const session = await getServerSession(authOptions);
  const currentUser = await getCurrentUser(session!.strapiToken!);
  return (
    <div className={styles.block}>
      <h2 className='font-bold text-lg mb-4'>Настройки аккаунта</h2>

      <div className='mb-8'>
        <h3 className={styles.h3}>Данные аккаунта</h3>
        <EditUsername username={currentUser.username} />
        <div className='mb-2'>
          <div className='block italic'>Email: </div>
          <div>{currentUser.email}</div>
        </div>
        <div className='mb-2'>
          Последнее обновление: {new Date(currentUser.updatedAt).toLocaleString()}
        </div>
      </div>

      <div className='mb-8'>
        <h3 className={styles.h3}>Смена пароля</h3>
        <ChangePassword />
      </div>
    </div>
  );
}