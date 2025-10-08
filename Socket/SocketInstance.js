// src/socket/index.js
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter"; // ✅ correct one
import { createClient } from "redis";                      // ✅ proper Redis client
import { adminControlledQuizHandler } from "./Admin Controlled/handler.js";
import { userControlledQuizHandler } from "./User Controlled/handler.js";

let io;
const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";


export const initSocket = async (server) => {
    if (io) return io;

    const pubClient = createClient({ 
        url: redisUrl,
     });
    const subClient = pubClient.duplicate();

    await pubClient.connect();
    await subClient.connect();

    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.adapter(createAdapter(pubClient, subClient));

    const adminControlledQuiz = io.of("/adminControlledQuiz");
    const userControlledQuiz = io.of("/userControlledQuiz");

    adminControlledQuiz.on("connection", (socket) => {
        console.log("✅ New socket connected to /adminControlledQuiz:", socket.id);
        adminControlledQuizHandler(io, socket);
    });

    userControlledQuiz.on("connection", (socket) => {
        console.log("Someone Connnected to UserControlled Quiz", socket.id);
        userControlledQuizHandler(io, socket);
    })

    return io;
};
