import { Ticket, TicketStatus } from 'src/domain/entities/ticket.entity';
export abstract class TicketRepository {
  abstract findById(id: string): Promise<Ticket | null>;
  abstract reserveTicket(ticketId: string): Promise<boolean>;
  abstract updateStatus(id: string, status: TicketStatus): Promise<void>;
}