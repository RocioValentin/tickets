import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('reservations')
export class ReservationOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  ticketId: string;

  @Column()
  status: string;

  @Column()
  expiresAt: Date;
}