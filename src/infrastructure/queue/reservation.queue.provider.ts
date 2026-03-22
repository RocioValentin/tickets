import { Queue } from 'bullmq';
import { RESERVATION_QUEUE } from './reservation.queue';

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