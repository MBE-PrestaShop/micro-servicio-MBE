import { NextFunction, Response } from "express";
import { IRequest } from "../interfaces/express";
import MySQLConnectionFactory from "../db/mysql";

export const authorizeMiddleware = async (request: IRequest, response: Response, next: NextFunction) => {
    try {
        const { DB_SERVER, DB_NAME, DB_USER, DB_PASSWD } = request.body
       
       
        const mysqlFactory = new MySQLConnectionFactory();

        const pool = await mysqlFactory.createConnection({
            host: DB_SERVER,
            database: DB_NAME,
            user: DB_USER,
            password: DB_PASSWD,
            port: 3306
        }).catch((error)=>{
            console.error("Error en la conexión a la base de datos:", error);
            return response.json({ error: { message: "Error al conectar con la base de datos" } });
        });
    

       request.pool = pool;
       next();

    } catch (error) {
        console.error("Error en la conexión a la base de datos:", error);
        return response.json({ error: { message: "Error al conectar con la base de datos" } });
    }
};
