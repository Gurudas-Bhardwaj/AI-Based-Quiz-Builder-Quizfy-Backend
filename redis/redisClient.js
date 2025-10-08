// src/redis/redisClient.js
import Redis from "ioredis";

const redis = new Redis("rediss://default:ARVUAAImcDJkMGNjNmE0YmVmYzI0NWM3YWFlY2U3ODFiOGQ2YmY5OXAyNTQ2MA@cool-prawn-5460.upstash.io:6379"); // Use Render env variable

redis.on("connect", () => console.log("✅ Redis connected"));
redis.on("error", (err) => console.error("Redis error:", err));

export default redis;
