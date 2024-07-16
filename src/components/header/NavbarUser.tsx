import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import SignOutButton from './SignOutButton';
import SignInLink from './SignInLink';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css'

export default async function NavbarUser() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <SignInLink />;
  }
  return (
    <>
       <Link href='https://accishop.ru/catalog' className={styles.link}>
        В магазин
      </Link>
      <Link href='/account' className='text-sky-700 underline'>
        <Image
          className={styles.icon}
          src={`${process.env.STRAPI_BACKEND_URL}/uploads/settings_svgrepo_com_f96c21b20b.svg`}
          width={24}
          height={24}
          alt={'Настройки'}
        />
      </Link>
      <SignOutButton />
    </>
  );
}
