import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReservationRepository } from '../../domain/repositories/reservation.repository';
import { Reservation } from '../../domain/entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationOrmEntity } from './reservation.orm-entity';
import { DataSource } from 'typeorm';

export const RESERVATION_REPOSITORY = 'RESERVATION_REPOSITORY';

@Injectable()
export class ReservationRepositoryImpl implements ReservationRepository {
  constructor(
    @InjectRepository(ReservationOrmEntity)
    private repo: Repository<ReservationOrmEntity>,
    private dataSource: DataSource,
  ) {}

  async save(reservation: Reservation): Promise<void> {
    await this.repo.save({
      id: reservation.id,
      ticketId: reservation.ticketId,
      status: reservation.status,
      expiresAt: reservation.expiresAt,
    });
  }

  async findById(id: string): Promise<Reservation | null> {
    const result = await this.dataSource.query(
      `SELECT * FROM reservations WHERE id = $1`,
      [id],
    );
      
    if (result.length === 0) return null;
    return result[0]; // puedes mapear luego a entidad
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await this.dataSource.query(
      `
      UPDATE reservations
      SET status = $1
      WHERE id = $2
      `,
      [status, id],
    );
  }
}