export interface Ticket {
    id: number;
    title: string;
    message: string;
    date: string;
    status: boolean;
    img?: string;
    user: { id: number; username: string };
    admins: { id: number; username: string }[];
  }