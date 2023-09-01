import { config } from "dotenv";
import { join } from "path";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { ENV } from ".";
config();

const ENV_UPPERCASE = ENV.toLocaleUpperCase();
const IS_EXTRA_SSL = getDbVar(`DB_EXTRA_SSL`) === "true";

//* Each key is the name of a connection 
//* Even though we'll have different dbs for Staging and Production, it's the "default" connection anyway;

export const DB_CONNECTIONS: { [key: string]: PostgresConnectionOptions} =  {
    default: {
        type: "postgres",

        port: parseInt(`${getDbVar("DB_PORT")}` || "5433"),
        host: getDbVar("DB_HOST") || "localhost",
        username: getDbVar("DB_USERNAME") || "username",
        database: getDbVar("DB_DATABASE") || "database",
        password: getDbVar("DB_PASSWORD") || "password",
        logging: getDbVar("DB_LOGGING") === "true",
        synchronize:getDbVar("DB_SYNCHRONIZE") === "true",
        ssl: IS_EXTRA_SSL,
        ...IS_EXTRA_SSL && {
            extra: {
                ssl: {
                    rejectUnauthorized: false,
                },
            }
        },
        entities: [join(__dirname, "../db/entities/*/*.entity.{ts,js}"), join(__dirname, "../db/entities/admin/*.entity.{ts,js}")],
        migrations: [join(__dirname, "../db/migrations/*.{ts,js}")],
        subscribers: ["../db/subscriber/**/*subscriber.{ts,js}"],
    }
}

function getDbVar(variable: string) {
    return process.env[`${ENV_UPPERCASE}_${variable}`]
}
