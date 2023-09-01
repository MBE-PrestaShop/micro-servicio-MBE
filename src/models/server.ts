
import dotenv from 'dotenv';
dotenv.config();
import express, { Application } from "express"
import config from "../config"
import cors from 'cors';
import shippingRouter from '../routes/shipping/shipping.routes';

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        shipping: '/api/shipping',
       
    }

    constructor() {
        this.app = express();
        this.port = config.port || "8000"

        this.middlewares();

        this.routes();
    }

    middlewares() {
        this.app.use(cors({
            origin: (_, next) => {
                next(null, true);
            },
            credentials: true,
        }))

        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.apiPaths.shipping, shippingRouter)
      
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 Server ON: http://localhost:${this.port}`);
        })
    }
}

export default Server;