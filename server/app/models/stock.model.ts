import { INTEGER, ModelAttributes } from "sequelize";
import { DataType, Model } from "sequelize-typescript";

export interface IStock {
  id: number;
  creationTime: string;
  changeTime: string;
  instrument: string;
  status: string;
  side: string;
  amount: number;
  price: number;
}

const { STRING } = DataType;

export const StockModel: ModelAttributes<Model, IStock> = {
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  creationTime: {
    type: STRING,
    allowNull: false,
  },
  changeTime: {
    type: STRING,
    allowNull: false,
  },
  instrument: {
    type: STRING,
    allowNull: false,
  },
  status: {
    type: STRING,
    allowNull: false,
  },
  side: {
    type: STRING,
    allowNull: false,
  },
  amount: {
    type: STRING,
    allowNull: false,
  },
  price: {
    type: STRING,
    allowNull: false,
  },
};
