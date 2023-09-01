import config from "../config";
import { Response } from "express";

export default {
    login: (res: Response, token: string) => {

        return res.cookie(config.cookies.auth.user, token, {
            maxAge: (60 * 60 * 24 * 1000),
            httpOnly: true,
            sameSite: "lax",
            secure: true,
        });
    },

    logout: (res: Response) => {
        return res.clearCookie(config.cookies.auth.user, {
            expires: new Date(-1),
            httpOnly: true,
            sameSite: "lax",
            secure: true,
        })
    }
};