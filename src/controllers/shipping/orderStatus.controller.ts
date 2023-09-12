
import { Request, Response } from 'express';
import { IRequest } from "../../interfaces/express";
import { statusService } from "../../service/statusShipping.services"
export const orderStatus = async (request: IRequest, response: Response) => {

    const {  DB_PREFIX } = request.body;
    const pool = request.pool
      const status = await statusService(DB_PREFIX,pool);
      console.log("🚀 ~ file: orderStatus.controller.ts:9 ~ orderStatus ~ status:", status)
      

}