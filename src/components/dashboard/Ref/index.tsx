import React from "react";
import styles from "./Ref.module.css"
import { getServerSession } from 'next-auth';
import { getCurrentUser } from '@/lib/fetchData/getCurrentUser';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export default async function Ref() {
    const session = await getServerSession(authOptions);
    const currentUser = await getCurrentUser(session!.strapiToken!);
    return (
        <div className={styles.ref}>
            <p className={styles.p}>
                Ваш реферальный код
            </p>
            <p className={styles.a}>
                {currentUser.reflink}
            </p>
            <p className={styles.p_link}>
                Ваша реферальная ссылка
            </p>
            <p className={styles.a}>
                lk.accishop.ru/signup/?ref={currentUser.reflink}
            </p>
        </div>
    );
}