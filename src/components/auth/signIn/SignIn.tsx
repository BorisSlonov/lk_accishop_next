import Link from 'next/link';
import GoogleSignInButton from './GoogleSignInButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import GoogleSignInError from './GoogleSignInError';
import SignInForm from './SignInForm';
import { redirect } from 'next/navigation';
import styles from './Signin.module.css'

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.h2}>
        Войти
      </h2>
      {session ? (
        redirect('/')
      ) : (
        <div>
          <p className='mb-4'>
            Войдите в аккаунт или{' '}
            <Link href='/signup' className='underline'>
              зарегистрируйтесь.
            </Link>
          </p>
          <SignInForm />
          <GoogleSignInButton />
          <GoogleSignInError />
        </div>
      )}
    </div>
  );
}
