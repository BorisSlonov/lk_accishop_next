import Link from 'next/link';
import Image from 'next/image';
import NavbarUser from './NavbarUser';
import styles from './Navbar.module.css'

export default async function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link href='/' className='mr-auto'>
        <Image src={`${process.env.STRAPI_BACKEND_URL}/uploads/logo_min_cf51f20f41.svg`} width={64} height={64} alt={'logo'} />
      </Link>
      <NavbarUser />
    </nav>
  );
}
