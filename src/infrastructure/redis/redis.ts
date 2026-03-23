import  Redis  from 'ioredis';

export const redis = new Redis(process.env.REDIS_URL!, {
  tls: {
    rejectUnauthorized: false,
  },
});
// export const redis = new Redis({
//   host: process.env.REDIS_HOST,
//   port: Number(process.env.REDIS_PORT),
// });