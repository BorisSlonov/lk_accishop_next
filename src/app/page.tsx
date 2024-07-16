import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import { getCurrentUser } from '@/lib/fetchData/getCurrentUser';
import Dashboard from '@/components/dashboard/Dashboard';

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
  }
  const currentUser = await getCurrentUser(session!.strapiToken!);

  return (<>

    <Dashboard />


  </>);
}
