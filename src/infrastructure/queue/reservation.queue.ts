import { Queue } from 'bullmq';
import { redis } from '../redis/redis';

export const RESERVATION_QUEUE = 'RESERVATION_QUEUE';

export const reservationQueueProvider = {
  provide: RESERVATION_QUEUE,
  useFactory: () => {
    return new Queue('reservation-expiration', {
      connection: {
        host: '127.0.0.1',
        port: 6379,
      },
    });
  },
};