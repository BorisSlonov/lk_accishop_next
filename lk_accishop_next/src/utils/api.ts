import { Ticket } from '@/types/tickets';

export const fetchTickets = async (): Promise<Ticket[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/tickets`);
    if (!response.ok) {
        throw new Error('Failed to fetch tickets');
    }
    return response.json();
};

export const fetchTicketById = async (id: number): Promise<Ticket> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/tickets/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch ticket');
    }
    return response.json();
};

export const updateTicketStatus = async (id: number, status: boolean): Promise<Ticket> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/tickets/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });
    if (!response.ok) {
        throw new Error('Failed to update ticket status');
    }
    return response.json();
};
