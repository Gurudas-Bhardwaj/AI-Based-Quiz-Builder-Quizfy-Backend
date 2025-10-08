import express from "express"
import {connection} from "./connect.js"
import { userRouter } from "./Router/userRoute.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http"
import {handleRouter} from "./Router/handleRoute.js"
import {initSocket} from './Socket/SocketInstance.js' 

import dotenv from 'dotenv';
import path from "path";
dotenv.config({ path: '.././secret.env' });


const app = express();

const port = process.env.PORT || 9000;
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: allowedOrigin,
  credentials: true,
}));
app.use(cookieParser());

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const server = http.createServer(app);

initSocket(server);

connection(process.env.MONGO_DB_URL)
  .then(() => console.log("Connected Successfully!"))
  .catch((err) => console.log("Error: ", err));


app.use("/user/",userRouter);
app.use("/handleQuestions/",handleRouter);


server.listen(port, () => {
    console.log("Server started on port 9000!");
});