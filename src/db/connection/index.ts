import { DataSource } from "typeorm";
import ormconfig from "./ormconfig";

const AppDataSource = new DataSource(ormconfig);

export const createConnection = async () => {
    
    await AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!");
        })
};

export default AppDataSource;