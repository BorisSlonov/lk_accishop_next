import React from "react";
import { getServerSession } from 'next-auth';
import { getCurrentUser } from '@/lib/fetchData/getCurrentUser';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import styles from './Info.module.css';

export default async function Info() {
    const session = await getServerSession(authOptions);
    const currentUser: any = await getCurrentUser(session!.strapiToken!);
    return (
        <div className={styles.info}>
            <div className={styles.item}>
                <p className={styles.sign}>
                    Количество Рефералов
                </p>
                <p className={styles.count}>
                    {currentUser.refCount}
                </p>
            </div>
            <div className={styles.item}>
                <p className={styles.sign}>
                    Бонусы
                </p>
                <p className={styles.count}>
                    {currentUser.balance}₽
                </p>
            </div>
            <div className={styles.item}>
                <p className={styles.sign}>
                    Личные Сообщения
                </p>
                <p className={styles.count}>
                    0
                </p>
            </div>
        </div>
    );
}