export const getRedisConfig = () => {
  // si existe REDIS_URL producción
  if (process.env.REDIS_URL) {
    // const redisUrl = new URL(process.env.REDIS_URL!);
    console.log('Using Redis URL:', process.env.REDIS_URL);

    return {
        url: process.env.REDIS_URL,
    //   host: redisUrl.hostname,
    //   port: Number(redisUrl.port),
    //   ...(redisUrl.username && { username: redisUrl.username }),
    //   ...(redisUrl.password && { password: redisUrl.password }),
      tls: {
        rejectUnauthorized: false,
      }, 
    };
  }

  // local
  return {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
  };
};