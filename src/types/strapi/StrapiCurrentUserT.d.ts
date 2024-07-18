export type StrapiCurrentUserT = {
  provider: ReactNode;
  balance: number;
  reflink: string;
  refcount: number;
  inviter: string;
  totalAmount: number;
  id: number;
  username: string;
  sale: number;
  rank: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: date;
  updatedAt: date;
  orders: {
    map(arg0: (order: any, index: any) => import("react").JSX.Element): import("react").ReactNode;
    product_name: string;
    product_link: string;
    price: number;
    order_id;
  }
};
