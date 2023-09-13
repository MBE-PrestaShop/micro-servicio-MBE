
// import { pool } from "../db/mysql"
import { statusService } from "../service/statusShipping.services"

export const Socket = async (io: any) => {

    io.on("connection", (socket: any) => {

        
        console.log("🚀 ~ file: socket.ts:6 ~ io.on ~ socket:", socket.id)
      

    })

}