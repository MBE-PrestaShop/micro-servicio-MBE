import { createPool } from 'mysql2/promise'

export const pool = createPool({
    host: "localhost",
    user: "root",
    password: "js004522",
    port: 3306,
    database: "mbe_shipping"
});