
require("dotenv").config();

import { TypeEnv } from "../interfaces/config/config.types";

export const ENV = (process.env.NODE_ENV || "development") as TypeEnv;

export default {
    env: ENV,
    port: process.env.PORT,
    mbeShippingUrl: `${process.env.MBE_SHIPPING_URL}`,
    url:` http://localhost:${process.env.PORT}`,
    token: {
        secret: process.env.SECRET_JWT || "",
    },
    cookies: {
        secret: `${process.env.COOKIE_SECRET}`,
        domain: `${process.env.COOKIE_DOMAIN}`,
        name: process.env.COOKIE_NAME || "",
        auth: {
            user: `${process.env.COOKIE_PUBLIC}`,

        },
    },
}