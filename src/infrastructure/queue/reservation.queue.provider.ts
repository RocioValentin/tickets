import { Queue } from 'bullmq';
import { RESERVATION_QUEUE } from './reservation.queue';

export const reservationQueueProvider = {
  provide: RESERVATION_QUEUE,
  useFactory: () => {
    return new Queue('reservation-expiration', {
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    });
  },
};