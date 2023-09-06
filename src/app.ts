// import dotenv from 'dotenv';
import Server from './models/server';


// import { createConnection } from "./db/connection";

// createConnection().then(() => {
//     console.log("💾 Database connected");
// });

const server = new Server();


server.listen();