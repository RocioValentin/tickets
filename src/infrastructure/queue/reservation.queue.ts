import { Queue } from 'bullmq';
import { redis } from '../redis/redis';
import { getRedisConfig } from 'src/helper/redis_connection';

export const RESERVATION_QUEUE = 'RESERVATION_QUEUE';

export const reservationQueueProvider = {
  provide: RESERVATION_QUEUE,
  useFactory: () => {
    return new Queue('reservation-expiration', {
      connection: getRedisConfig(),
    });
  },
};