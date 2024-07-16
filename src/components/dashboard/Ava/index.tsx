import React from 'react';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { getCurrentUser } from '@/lib/fetchData/getCurrentUser';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import styles from './Ava.module.css'

export default async function Ava() {
    const session = await getServerSession(authOptions);
    const currentUser = await getCurrentUser(session!.strapiToken!);
    return (
        <>
            <Image
                className={styles.ava}
                src="https://accishop.ru/assets/v2/img2/logo.svg"
                width={360}
                height={80}
                alt={'лого'} />
        </>
    );
}