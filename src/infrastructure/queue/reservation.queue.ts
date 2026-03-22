import { Queue } from 'bullmq';
import { redis } from '../redis/redis';

export const RESERVATION_QUEUE = 'RESERVATION_QUEUE';

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