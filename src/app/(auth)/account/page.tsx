import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Account from '@/components/auth/account/Account';
import { redirect } from 'next/navigation';
import NotEmailAccount from '@/components/auth/account/NotEmailAccount';

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/signin');
  }
  if (session.provider === 'google') {
    return (
      <NotEmailAccount />
    );
  }
  return <Account />;
}
