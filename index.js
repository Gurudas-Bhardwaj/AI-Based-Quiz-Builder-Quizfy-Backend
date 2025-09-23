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
dotenv.config({ path: '.././secret.env' });


const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(cookieParser());

app.use(express.urlencoded({extended : false}));
app.use(express.json());

const server = http.createServer(app);

initSocket(server);

connection("mongodb://127.0.0.1:27017/Quiz")
.then(()=>console.log("Connected Successfully!"))
.catch((err)=>console.log("Error : ",err))


app.use("/user/",userRouter);
app.use("/handleQuestions/",handleRouter);


server.listen(9000, () => {
    console.log("Server started on port 9000!");
});