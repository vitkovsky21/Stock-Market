import { StockModel } from './app/models/stock.model';
import type { SequelizeOptions } from 'sequelize-typescript';
import { Sequelize } from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
    host: 'mouse.db.elephantsql.com',
    username: "vdnhvqcc",
    password: "RMsiJ25jyvI4pZCw6Vx0kOL7aYY6Pdp9",
    database: "vdnhvqcc",
    dialect: 'postgres',
    ssl: false,
    dialectOptions: {},
  };
  
  const sequelize = new Sequelize(sequelizeOptions);
  
  export const Stock = sequelize.define('Stock', StockModel, {});
  
  export async function connect() {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
      console.log('Connected to db');
    } catch (err) {
      console.error("Can't connect to db: ", err);
    }
  }
  
  export function startBackWithBase() {
    connect().then();
  }