import { Response } from 'express';
import { IRequest } from "../../interfaces/express";
import { processorProvider } from "../../provider/shipping/newOders"

export const shipping = async (request: IRequest, response: Response) => {
    try {
        const { idOrder, DB_PREFIX } = request.body;
        
        const pool = request.pool

        const [tokenMBE] = await pool.query(`select * from ${DB_PREFIX}mbe_shipping_token`);
        if (!tokenMBE) return response.json({ error: "token not fount" })
        
      
        const [order] = await pool.query(`select * from ${DB_PREFIX}orders where id_order = ?`, [idOrder]);
        if (!order) return response.json({ error: "order not fount" })
   
       
        const [customer] = await pool.query(`select * from ${DB_PREFIX}customer where id_customer = ?`, [order[0].id_customer]);
        if (!customer) return response.json({ error: "customer not fount" })

        const [address] = await pool.query(`select * from ${DB_PREFIX}address where id_customer = ?`, [order[0].id_customer]);
        if (!address) return response.json({ error: "customer not fount" })

        processorProvider.createOrders({
            token: tokenMBE[0].token_shipping,
            shipping_service: tokenMBE[0].id_service,
            action: 'newshipment',
            order_number: order[0].reference,
            order_total: 0,
            label: 1,
            order_currency: 'MN',
            recipient_name: customer[0].firstname + customer[0].lastname,
            recipient_add1: address[0].address1,
            recipient_add2: address[0].address2,
            
            recipient_city: address[0].city,
            recipient_state: address[0].city,
            recipient_cp: '00001',
            recipient_phone: address[0].phone,
            recipient_email: customer[0].email,
            package_weight: 1,
            package_length: '1',
            package_width: '1',
            package_height: '1',
            package_dim_unit: 'in',
            package_weight_unit: 'Lb',
            recipient_country: 'DO'
        }).then((result) => {
            console.log(result.data.error);
            if (result.data.error) return response.json({ error: { message: result.data.error } })
           
            response.status(200).json({
                createOrdern: true
            })
        }).catch((err) => {
            response.status(500).json(err)

        })

    } catch (error) {
        console.error('Error in signIn:', error);

        response.status(500).json({ error: { message: 'Unknown error' } });
    }
};
