// types.ts

interface Order {
    order_id: string;
    id: number;
    product_name: string;
    product_link: string;
    price: number;
    order_date: Date;
}

interface Rank {
    id: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    name: string;
    sale: number;
    sum: number;
    cashback: number;
    inviterCashback: number;
}

interface User {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    refCount: number;
    balance: number;
    totalAmount: number;
    reflink: string;
    inviter: string;
    orders: Order[];
    rank: Rank;
}

export type { Rank, User, Order };
