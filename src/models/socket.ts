
import { statusService } from "../service/statusShipping.services"
import MySQLConnectionFactory from "../db/mysql";
export const Socket = async (io: any) => {

    io.on("connection", (socket: any) => {

        const status = async () => {
                socket.on('server:status', async (data:any) => {
                    const mysqlFactory = new MySQLConnectionFactory();

                    const pool = await mysqlFactory.createConnection({
                        host: data.DB_SERVER,
                        database: data.DB_NAME,
                        user: data.DB_USER,
                        password: data.DB_PASSWD,
                        port: 3306
                    })

                    await statusService(data.DB_PREFIX,pool)
                })

          
        }

        status()
        
        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    

    })

}

