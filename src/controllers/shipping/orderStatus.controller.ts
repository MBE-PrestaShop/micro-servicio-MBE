
import { Request, Response } from 'express';
import { IRequest } from "../../interfaces/express";
import { statusService } from "../../service/statusShipping.services"
export const orderStatus = async (request: IRequest, response: Response) => {

    const {  DB_PREFIX } = request.body;

    const pool = request.pool
      const status = await statusService(DB_PREFIX,pool);
      if(!status) return response.json({ error: { message: 'error update status' } })
      response.status(200).json({
        createOrdern: true
    })
      

}