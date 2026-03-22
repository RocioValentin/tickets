// src/infrastructure/db/ticket.orm-entity.ts
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('tickets')
export class TicketOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  status: string;
}