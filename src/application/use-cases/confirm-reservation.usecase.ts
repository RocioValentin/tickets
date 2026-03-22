import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { ReservationRepository } from '../../domain/repositories/reservation.repository';
import { TicketRepository } from '../../domain/repositories/ticket.repository';

import { RESERVATION_REPOSITORY } from 'src/infrastructure/db/reservation.repository.impl';
import { TICKET_REPOSITORY } from 'src/infrastructure/db/ticket.repository.impl';

import { ReservationStatus } from '../../domain/entities/reservation.entity';
import { TicketStatus } from '../../domain/entities/ticket.entity';

@Injectable()
export class ConfirmReservationUseCase {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private reservationRepo: ReservationRepository,

    @Inject(TICKET_REPOSITORY)
    private ticketRepo: TicketRepository,
  ) {}

  async execute(reservationId: string) {
    const reservation = await this.reservationRepo.findById(reservationId);

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    //idempotencia: si ya está confirmado, no hago nada

    if (reservation.status === ReservationStatus.CONFIRMED) {
        return { message: 'Already confirmed' };
    }

    // 🔥 1. validar estado
    if (reservation.status !== ReservationStatus.PENDING) {
      throw new ConflictException('Reservation is not pending');
    }

    // 🔥 2. validar expiración
    if (new Date() > reservation.expiresAt) {
      throw new ConflictException('Reservation expired');
    }

    // 🔥 3. confirmar reserva
    await this.reservationRepo.updateStatus(
      reservationId,
      ReservationStatus.CONFIRMED,
    );

    // 🔥 4. vender ticket
    await this.ticketRepo.updateStatus(
      reservation.ticketId,
      TicketStatus.SOLD,
    );

    return {
      message: 'Reservation confirmed',
    };
  }
}