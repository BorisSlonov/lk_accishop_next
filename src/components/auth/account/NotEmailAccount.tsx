import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getCurrentUser } from '@/lib/fetchData/getCurrentUser';
import { getServerSession } from 'next-auth';
import EditUsername from './EditUsername';
import styles from './Account.module.css'
import EditInviter from './EditInviter';

export default async function NotEmailAccount() {
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
      </div>

      <div className='mb-8'>
        <h3 className={styles.h3}>Вы зарегистрированы через</h3>
        {currentUser.provider}
      </div>

      <div className='mb-8'>
        <h3 className={styles.h3}>Данные аккаунта</h3>
        <EditInviter inviter={currentUser.inviter} />
      </div>
  
    </div>
  );
}