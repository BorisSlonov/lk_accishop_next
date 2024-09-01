import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchTickets } from '@/utils/api';
import { Ticket } from '@/types/tickets';

const Tickets: React.FC = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const getTickets = async () => {
            try {
                const data = await fetchTickets();
                setTickets(data);
            } catch (error) {
                console.error('Failed to fetch tickets:', error);
            }
        };
        getTickets();
    }, []);

    return (
        <div>
            <h1>Tickets</h1>
            <ul>
                {tickets.map((ticket) => (
                    <li key={ticket.id}>
                        <Link href={`/tickets/${ticket.id}`}>
                            {ticket.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tickets;
