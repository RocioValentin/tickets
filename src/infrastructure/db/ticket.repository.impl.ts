// src/infrastructure/db/ticket.repository.impl.ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TicketRepository } from '../../domain/repositories/ticket.repository';
import { Ticket, TicketStatus } from 'src/domain/entities/ticket.entity';

export const TICKET_REPOSITORY = 'TICKET_REPOSITORY';

@Injectable()
export class TicketRepositoryImpl implements TicketRepository {
  constructor(private dataSource: DataSource) {}

  async reserveTicket(ticketId: string): Promise<boolean> {
    //console.log('Attempting to reserve ticket with ID:', ticketId);
    const result = await this.dataSource.query(
      `
      UPDATE tickets
      SET status = 'RESERVED'
      WHERE id = $1 AND status = 'AVAILABLE'
      `,
      [ticketId],
    );

    return result.length > 0;
  }

  async findById(id: string): Promise<Ticket | null> {
    const result = await this.dataSource.query(
      `SELECT * FROM tickets WHERE id = $1`,
      [id],
    );
    
    if (result.length === 0) return null;
    return result[0]; // puedes mapear luego a entidad
  }

  async updateStatus(id: string, status: TicketStatus): Promise<void> {
    await this.dataSource.query(
      `
      UPDATE tickets
      SET status = $1
      WHERE id = $2
      `,
      [status, id],
    );
  }

}