import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RESERVATION_REPOSITORY, ReservationRepositoryImpl } from './infrastructure/db/reservation.repository.impl';
import { TicketRepositoryImpl } from './infrastructure/db/ticket.repository.impl';
import { ReservationController } from './interfaces/controllers/reservation.controller';
import { CreateReservationUseCase } from './application/use-cases/create-reservation.usecase';
import { ReservationOrmEntity } from './infrastructure/db/reservation.orm-entity';
import { TicketOrmEntity } from './infrastructure/db/ticket.orm-entity';
import { TICKET_REPOSITORY } from './infrastructure/db/ticket.repository.impl';
import { RESERVATION_QUEUE } from './infrastructure/queue/reservation.queue';
import { reservationQueueProvider } from './infrastructure/queue/reservation.queue';
import { ReservationWorker } from './infrastructure/workers/reservation.worker';
import { ConfirmReservationUseCase } from './application/use-cases/confirm-reservation.usecase';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false },
         }
        : {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          }),
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ReservationOrmEntity, TicketOrmEntity]),
  ],
  controllers: [AppController, ReservationController],
  providers: [AppService, 
    CreateReservationUseCase, 
    ReservationRepositoryImpl, 
    TicketRepositoryImpl, 
    ReservationWorker,
    reservationQueueProvider,
    ConfirmReservationUseCase,
    {
      provide: TICKET_REPOSITORY,
      useClass: TicketRepositoryImpl,
    },
    {
      provide: RESERVATION_REPOSITORY,
      useClass: ReservationRepositoryImpl,
    },
  ],
})
export class AppModule {}
