// types.ts

interface Order {
    name: string;
    bill: string;
    price: number;
    count: number;
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
