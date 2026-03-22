import { Queue } from 'bullmq';
import { RESERVATION_QUEUE } from './reservation.queue';
import { getRedisConfig } from 'src/helper/redis_connection';

export const reservationQueueProvider = {
  provide: RESERVATION_QUEUE,
  useFactory: () => {
    return new Queue('reservation-expiration', {
      connection: getRedisConfig(),
    });
  },
};