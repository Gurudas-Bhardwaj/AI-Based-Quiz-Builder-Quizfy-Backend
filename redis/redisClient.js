// src/redis/redisClient.js
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL); // Use Render env variable

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("Redis error:", err));

export default redis;
