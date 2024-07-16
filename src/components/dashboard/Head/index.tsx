import React from "react";
import styles from "./Head.module.css";
import { getServerSession } from 'next-auth';
import { getCurrentUser } from '@/lib/fetchData/getCurrentUser';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from "next/link";

export default async function Head() {
    const session = await getServerSession(authOptions);
    const currentUser: any = await getCurrentUser(session!.strapiToken!);

    return (
        <div className={styles.header}>
            <Link className={styles.user} href={"/account"}>{currentUser.username}</Link>
            <div className={styles.item}>
                <p className={styles.sign}>
                    Ранг:
                </p>
                <span className={styles.value}>
                    {currentUser.rank.name}
                </span>
            </div>
            <div className={styles.item}>
                <p className={styles.sign}>
                    Кешбек:
                </p>
                <span className={styles.value}>
                    {currentUser.rank.cashback}%
                </span>
            </div>
            <div className={styles.item}>
                <p className={styles.sign}>
                    Кешбек с рефералов:
                </p>
                <span className={styles.value}>
                    {currentUser.rank.inviterCashback}%
                </span>
            </div>
        </div>
    );
}
