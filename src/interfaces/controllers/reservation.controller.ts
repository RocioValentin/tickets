// src/interfaces/controllers/reservation.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { CreateReservationUseCase } from '../../application/use-cases/create-reservation.usecase';
import { ConfirmReservationUseCase } from 'src/application/use-cases/confirm-reservation.usecase';
import { Param } from '@nestjs/common';

@Controller('reservations')
export class ReservationController {
  constructor(private useCase: CreateReservationUseCase,
    private confirmReservationUseCase: ConfirmReservationUseCase,
  ) {}

  @Post()
  async create(@Body('ticketId') ticketId: string) {
    console.log('ReservationController initialized');
    console.log('Ticket ID received:', ticketId);
    return this.useCase.execute(ticketId);
  }

  @Post(':id/confirm')
  async confirm(@Param('id') id: string) {
    return this.confirmReservationUseCase.execute(id);
  }
}