import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { DB_CONNECTIONS } from "../../config/db.config";

export default DB_CONNECTIONS.default as PostgresConnectionOptions;
