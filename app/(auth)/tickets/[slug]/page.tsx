import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchTicketById, updateTicketStatus } from '@/utils/api';
import { Ticket } from '@/types/tickets';


const TicketPage: React.FC = () => {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [message, setMessage] = useState<string>('');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (!id) return;

        const getTicket = async () => {
            try {
                const data = await fetchTicketById(Number(id));
                setTicket(data);
            } catch (error) {
                console.error('Failed to fetch ticket:', error);
            }
        };
        getTicket();
    }, [id]);

    const handleStatusChange = async () => {
        if (!ticket) return;
        try {
            const updatedTicket = await updateTicketStatus(ticket.id, true);
            setTicket(updatedTicket);
        } catch (error) {
            console.error('Failed to update ticket status:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Логика для отправки сообщения на сервер Strapi
    };

    if (!ticket) return <div>Loading...</div>;

    return (
        <div>
            <h1>{ticket.title}</h1>
            <p>{ticket.message}</p>
            <p>Status: {ticket.status ? 'Closed' : 'Open'}</p>

            {!ticket.status && (
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>
            )}

            {!ticket.status && (
                <button onClick={handleStatusChange}>Close Ticket</button>
            )}
        </div>
    );
};

export default TicketPage;