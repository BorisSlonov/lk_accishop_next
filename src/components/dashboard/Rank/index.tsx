import React from "react";
import Image from "next/image";
import { getServerSession } from 'next-auth';
import { getCurrentUser } from '@/lib/fetchData/getCurrentUser';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import styles from './Rank.module.css';
import ProgressBar from "./ProgressBar";
import Link from "next/link";
import ArrowSvg from "./Arrow";

export default async function Rank() {
    const session = await getServerSession(authOptions);
    const currentUser: any = await getCurrentUser(session!.strapiToken!);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.totalAmount}>
                    <div className={styles.totalAmountHead}>
                        <Image
                            src={`${process.env.STRAPI_BACKEND_URL}/uploads/money_48a47e9a5f.svg`}
                            alt={"Купюра"}
                            width={49}
                            height={26}
                        />
                        <p className={styles.title}>
                            Общая Сумма Выкупа
                        </p>
                    </div>
                    <span className={styles.totalAmountSum}>
                        {currentUser.totalAmount}₽
                    </span>
                </div>
                <Link className={styles.link} href={"/"}>
                    Все о рангах и скидках
                    <ArrowSvg className="customClass" />
                </Link>
            </div>
            <div className={styles.ranks}>
                <ProgressBar totalAmount={currentUser.totalAmount} />
            </div>
        </div>
    )
}
