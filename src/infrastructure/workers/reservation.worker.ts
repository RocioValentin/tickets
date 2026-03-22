import { Injectable, OnModuleInit } from '@nestjs/common';
import { Worker } from 'bullmq';
import { Inject } from '@nestjs/common';

import { TicketRepository } from '../../domain/repositories/ticket.repository';
import { ReservationRepository } from '../../domain/repositories/reservation.repository';

import { TICKET_REPOSITORY } from '../db/ticket.repository.impl';
import { RESERVATION_REPOSITORY } from '../db/reservation.repository.impl';

import { TicketStatus } from '../../domain/entities/ticket.entity';
import { getRedisConfig } from 'src/helper/redis_connection';

@Injectable()
export class ReservationWorker implements OnModuleInit {
  constructor(
    @Inject(TICKET_REPOSITORY)
    private ticketRepo: TicketRepository,

    @Inject(RESERVATION_REPOSITORY)
    private reservationRepo: ReservationRepository,
  ) {}

  onModuleInit() {
    new Worker(
      'reservation-expiration',
      async (job) => {
        const { reservationId, ticketId } = job.data;

        console.log('⏳ Expirando:', reservationId);

        const reservation = await this.reservationRepo.findById(reservationId);

        if (!reservation) return;
        if (reservation.status !== 'PENDING') return;

        await this.reservationRepo.updateStatus(reservationId, 'EXPIRED');
        await this.ticketRepo.updateStatus(ticketId, TicketStatus.AVAILABLE);

        console.log('Expirado correctamente');
      },
      {
        connection: getRedisConfig(),
      },
    );
  }
}