import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import SignUpForm from './SignUpForm';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function SignUp() {
  const session = await getServerSession(authOptions);
  return (
    <div className='mx-auto my-8 p-8 max-w-lg bg-zinc-100 rounded-sm'>
      <h2 className='text-center text-2xl text-blue-400 mb-8 font-bold'>
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
