// import { createPool } from 'mysql2/promise'

// export const pool = createPool({
//     host: "localhost",
//     user: "root",
//     password: "js004522",
//     port: 3306,
//     database: "mbe_shipping"
// });


import  { Pool,createPool } from 'mysql2/promise';

class MySQLConnectionFactory {
  private connections: Map<string, Pool>;

  constructor() {
    this.connections = new Map();
  }

  async createConnection(databaseConfig: {
    user: string;
    password: string;
    host: string;
    port: number;
    database: string;
  }): Promise<Pool> {
    const connectionKey = JSON.stringify(databaseConfig);

    if (!this.connections.has(connectionKey)) {
      const connectionPool = createPool({
        host: databaseConfig.host,
        port: databaseConfig.port,
        user: databaseConfig.user,
        password: databaseConfig.password,
        database: databaseConfig.database,
      });
      this.connections.set(connectionKey, connectionPool);
     
    }

   
    return this.connections.get(connectionKey) as Pool;
  }
}

export default MySQLConnectionFactory;

