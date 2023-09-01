import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import cookie from "cookie"; // Asegúrate de importar la biblioteca cookie si aún no lo has hecho.
import { getUserOne } from "../service/user/getOneUser.services";
import { IRequest } from "../interfaces/express";

export const authorizeMiddleware = (request: IRequest, response: Response, next: NextFunction) => {
    try {
        const cookies = cookie.parse(request.headers.cookie || ''); // Parsear las cookies
        const token = Object.values(cookies)[0]
       
        if (!token) {
            return response.status(401).json({ error: { message: "Unauthorized" } });
        }

        jwt.verify(token, config.cookies.secret, async (error: any, decoded: any) => {
            if (error) {
                return response.status(401).json({ error: { message: "Unauthorized" } });
            }

            const user = await getUserOne({
                where: {
                    id: decoded.uuid
                }
            });

            if (user.error || !user.data) {
                return response.status(403).json({ error: { message: "Unauthorized" } });
            }

            request.user = user.data
            next();
        })

    } catch (error) {
        return response.status(401).json({ error: { message: "Unauthorized" } });
    }
};
