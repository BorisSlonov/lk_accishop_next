import React from "react";
import { getServerSession } from 'next-auth';
import { getCurrentUser } from '@/lib/fetchData/getCurrentUser';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from "next/link";
import Image from "next/image";
import styles from './History.module.css'
import { Order } from '../types'

export default async function History() {
  const session = await getServerSession(authOptions);
  const currentUser: any = await getCurrentUser(session!.strapiToken!);
  return (
    <div className={styles.history}>
      <div className={styles.head}>
        <Image
          src={`${process.env.STRAPI_BACKEND_URL}uploads/Shopping_Cart_b0ca106168.svg`}
          alt={"Корзина"}
          width={24}
          height={24}
        />
        <h3 className={styles.h3}>
          История покупок
        </h3>
      </div>

      {<ul className={styles.list}>
        {currentUser.orders.length >= 1 ? currentUser.orders.map((order: Order, index: number) => (
          <li className={styles.list_item} key={index}>
            <p className={styles.name}>{order.name}</p>
            <div className={styles.links}>
              <p className={styles.link}>{order.count + 'шт'}</p>
              <div className={styles.dev}></div>
              <p className={styles.link}>{order.price + 'р'}</p>
              <div className={styles.dev}></div>
              <Link className={styles.link} href={'https://accishop.ru/order/' + order.bill ? order.bill : '/'}>Скачать</Link>
            </div>
          </li>
        )) : 'Тут пока пусто..'}
      </ul>}
    </div>
  );
}
