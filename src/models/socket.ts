
// import { pool } from "../db/mysql"
import { statusService } from "../service/statusShipping.services"

export const Socket = async (io: any) => {

    io.on("connection", (socket: any) => {


        const status = async () => {
            setTimeout(async () => {
                //  const status = await statusService()
                const cambioEnBaseDeDatos = { propiedad: status };
                socket.emit('server:status', cambioEnBaseDeDatos);

            }, 5000);
        }

        status()
        
        console.log("🚀 ~ file: socket.ts:6 ~ io.on ~ socket:", socket.id)
        const test = async () => {
            // const [tokenMBE]: any = await pool.query(`select * from ps_mbe_shipping_token`);
            // socket.emit("server:order", tokenMBE)

        }

        test()

        const update = async () => {
            // console.log("🚀 ~ file: socket.ts:11 ~ socket.emit ~ tokenMBE:", tokenMBE)
            socket.on("client:order", async (data: any) => {
                // const [result]: any = await pool.query(`UPDATE ps_mbe_shipping_token SET token_shipping = ? WHERE id_mbeshipping = ?`, ["1uBuDSruZ66PI_eTAAAM", 1]);

                // const [tokenMBE]: any = await pool.query(`select * from ps_mbe_shipping_token`);
                // io.emit("server:order", tokenMBE);
                // console.log("🚀 ~ file: socket.ts:23 ~ socket.on ~ result:", result)

            })

        }
        update()

    })

}