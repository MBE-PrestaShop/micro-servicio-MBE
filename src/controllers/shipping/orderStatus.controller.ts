
import { Request, Response } from 'express';
// import { statusService } from "../../service/statusShipping.services"
export const orderStatus = async (request: Request, response: Response) => {

    const { idOrder, DB_PREFIX } = request.body;

      // const status = await statusService();
      // console.log("🚀 ~ file: orderStatus.controller.ts:9 ~ orderStatus ~ status:", status)
      

}