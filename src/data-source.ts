import "reflect-metadata"
import { DataSource } from "typeorm"
import { Users } from "./entity/Users"
import { Orders } from "./entity/Orders"
import { Addresses } from "./entity/Addresses"
import {CompanyAddress} from "./entity/CompanyAddress";
import {OrderAddress} from "./entity/OrderAddress";
import {Contractors} from "./entity/Contractors";
import {Companies} from "./entity/Companies";



export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [Users,Orders,Addresses,CompanyAddress,OrderAddress,Contractors,Companies],
    migrations: ['src/migration/**/*.js'],
    subscribers: ['src/subscriber/**/*.js'],
})
