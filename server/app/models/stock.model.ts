import { BOOLEAN, INTEGER, ModelAttributes } from "sequelize";
import { DataType, Model } from "sequelize-typescript";

export interface IStock {
  counter: number;
  creationTime: string;
  changeTime: string;
  instrument: string;
  status: string;
  side: string;
  amount: number;
  price: number;
  randomStatus: boolean;
  randomCounter: number;
}

const { STRING } = DataType;

export const StockModel: ModelAttributes<Model, IStock> = {
  counter: {
    type: INTEGER,
    allowNull: false,
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
  randomStatus: {
    type: BOOLEAN,
    allowNull: false,
  },
  randomCounter: {
    type: INTEGER,
    allowNull: false,
  },
};
