import { Module } from '@nestjs/common';
import { reservationQueueProvider } from './reservation.queue.provider';

@Module({
  providers: [reservationQueueProvider],
  exports: [reservationQueueProvider],
})
export class QueueModule {}