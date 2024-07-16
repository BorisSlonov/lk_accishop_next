import Link from 'next/link';
import GoogleSignInButton from './GoogleSignInButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import GoogleSignInError from './GoogleSignInError';
import SignInForm from './SignInForm';
import { redirect } from 'next/navigation';

export default async function SignIn() {
  const session = await getServerSession(authOptions);
  return (
    <div className='mx-auto my-8 p-8 max-w-lg bg-zinc-100 rounded-sm'>
      <h2 className='text-center text-2xl text-blue-400 mb-8 font-bold'>
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
          <div className='text-center relative my-8 after:content-[""] after:block after:w-full after:h-[1px] after:bg-zinc-300 after:relative after:-top-3 after:z-0'>
            <span className='bg-zinc-100 px-4 relative z-10 text-zinc-400'>
              или
            </span>
          </div>
          <GoogleSignInButton />
          <GoogleSignInError />
        </div>
      )}
    </div>
  );
}
