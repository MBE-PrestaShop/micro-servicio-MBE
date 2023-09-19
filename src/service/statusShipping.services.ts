
// import { pool } from "../db/mysql"
import { processorProvider } from "../provider/shipping/newOders"


export const statusService = async (DB_PREFIX:any,pool:any) => {
    try {
    
        const [tokenMBE]: any = await pool.query(`select * from ${DB_PREFIX}mbe_shipping_token`);
        if (!tokenMBE) return { error: { message: "token not fount" } }

        const [orders]: any = await pool.query(`select * from ${DB_PREFIX}orders`);
        if (!orders) return { error: { message: "orders not fount" } }

        const referencias = orders.map((item: any) => item.reference);
       

        processorProvider.statusOrders({
            token: tokenMBE[0].token_shipping,
            action: 'orderstatusext',
            numbers: referencias
        }).then((result) => {
            result.data.map(async (data: any) => {
              
                if (data.status === "CREATED") {
                    const stateId = 2

                    const [orders]: any = await pool.query(
                        `UPDATE ${DB_PREFIX}orders 
                        SET current_state = ?  
                        WHERE reference = ?`,
                        [stateId, data.number]
                      );
                      if (!orders) return { error: { message: "token not found" } }

                    //   const [result]:any = await pool.query(`
                    //   SELECT *
                    //   FROM ${DB_PREFIX}order_carrier AS oc
                    //   INNER JOIN ${DB_PREFIX}orders AS o
                    //   ON oc.id_order = o.id_order
                    //   WHERE o.reference = ?`,[data.number])
                    //   console.log("🚀 ~ file: statusShipping.services.ts:42 ~ result.data.map ~ result:", result[0])
                      
                      const [ordersCarrier]: any = await pool.query(
                        `UPDATE ${DB_PREFIX}order_carrier AS oc
                        INNER JOIN ${DB_PREFIX}orders AS o
                        ON oc.id_order = o.id_order
                        SET oc.tracking_number = ?
                        WHERE o.reference = ?`,
                        [data.tracking, data.number]
                        );
                      if (!ordersCarrier) return { error: { message: "token not found" } }
        
                }

                if (data.status === "TRANSIT") {
                    const stateId = 4
                    const [orders]: any = await pool.query(`UPDATE ${DB_PREFIX}orders SET current_state = ?  WHERE reference = ?`, [stateId, data.number]);
                    if (!orders) return { error: { message: "token not fount" } }
                }

                if (data.status === "DELIVERED") {
                    const stateId = 5
                    const [orders]: any = await pool.query(`UPDATE ${DB_PREFIX}orders SET current_state = ?  WHERE reference = ?`, [stateId, data.number]);
                    if (!orders) return { error: { message: "token not fount" } }
                }


            })
            
           
        }).catch((error) => {
            console.log("🚀 ~ file: orderStatus.controller.ts:49 ~ orderStatus ~ error:", error)

        })

        return true;
    } catch (error) {
        console.log("🚀 ~ file: statusShipping.services.ts:51 ~ statusService ~ error:", error)

    }
}