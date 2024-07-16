import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import SignUpForm from './SignUpForm';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import styles from './Signup.module.css'

export default async function SignUp() {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.h2}>
        Зарегистрироваться
      </h2>
      {session ? redirect('/signin')
        : (
          <div>
            <p className='mb-4'>
              Создайте новый аккаунт или{' '}
              <Link href='/signin' className='underline'>
                войдите
              </Link>{' '}
              в существующий
            </p>
            <SignUpForm />
          </div>
        )}
    </div>
  );
}
