export const getRedisConfig = () => {
  // si existe REDIS_URL producción
  if (process.env.REDIS_URL) {
    const redisUrl = new URL(process.env.REDIS_URL);

    return {
      host: redisUrl.hostname,
      port: Number(redisUrl.port),
      username: redisUrl.username,
      password: redisUrl.password,
      tls: {}, 
    };
  }

  // local
  return {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
  };
};