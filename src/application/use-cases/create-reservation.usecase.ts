import { v4 as uuid } from 'uuid';  //Universally Unique Identifier
import { TicketRepository } from '../../domain/repositories/ticket.repository';
import { ReservationRepository,  } from '../../domain/repositories/reservation.repository';
import { Reservation, ReservationStatus } from '../../domain/entities/reservation.entity';
import { Inject, Injectable } from '@nestjs/common';
import { TICKET_REPOSITORY } from 'src/infrastructure/db/ticket.repository.impl';
import { RESERVATION_REPOSITORY } from 'src/infrastructure/db/reservation.repository.impl';
import { NotFoundException } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { RESERVATION_QUEUE} from 'src/infrastructure/queue/reservation.queue';
import { Queue } from 'bullmq';
import { redis } from 'src/infrastructure/redis/redis';

@Injectable()

export class CreateReservationUseCase {
  constructor(
    @Inject(TICKET_REPOSITORY)
    private ticketRepo: TicketRepository,

    @Inject(RESERVATION_REPOSITORY)
    private reservationRepo: ReservationRepository,

    @Inject(RESERVATION_QUEUE)
    private reservationQueue: Queue,
  ) {}

  async execute(ticketId: string) {

    await redis.set('test', 'ok');
    const value = await redis.get('test');
    console.log(value); // debería ser "ok"

    console.log('holaaaaaaaaaaaa', ticketId);
    const ticket = await this.ticketRepo.findById(ticketId);
    console.log('Ticket encontrado:', ticket);

    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    // 🔥 2. Verificar disponibilidad
    if (ticket.status !== 'AVAILABLE') {
      throw new ConflictException('Ticket not available');
    }

    // 🔥 3. Intentar reservar (evita race condition)

    const success = await this.ticketRepo.reserveTicket(ticketId);

    if (!success) {
      throw new ConflictException('Ticket already reserved');
    }

    const reservation = new Reservation(
      uuid(),
      ticketId,
      ReservationStatus.PENDING,
      new Date(Date.now() + 1 * 60 * 1000), // 10 min
    );

    await this.reservationRepo.save(reservation);

    await this.reservationQueue.add(
      'expire-reservation',
      {
        reservationId: reservation.id,
        ticketId: ticketId,
      },
      {
        delay: 1 * 60 * 1000,
      },
    );

    return reservation;
  }
}