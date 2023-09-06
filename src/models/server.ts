
import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from "express"
import config from "../config"
import cors from 'cors';
import shippingRouter from '../routes/shipping/shipping.routes';
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import { Socket } from "./socket"


class Server {
    private app: Application;
    private port: string;
    private server:any;
    private apiPaths = {
        shipping: '/api/shipping',
       
    }

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = config.port || "8000"

        this.middlewares();

        this.routes();
    }

    middlewares() {
        this.app.use(cors())

        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.apiPaths.shipping, shippingRouter)
      
    }

    listen() {
        const io = new WebSocketServer(this.server,{
            cookie: true,
            cors: { origin: "*" }
        });

        this.server.listen(this.port, () => {
            console.log(`🚀 Server ON: http://localhost:${this.port}`);
            Socket(io);
        })

    }
}

export default Server;