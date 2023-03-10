// import fetch from 'node-fetch';
import type { Request, Response } from "express";
import { Stock } from "../../db";

type Stock = {
  id: number;
  counter: number;
  creationTime: string;
  changeTime: string;
  instrument: string;
  status: string;
  side: string;
  amount: string;
  price: string;
  randomStatus: number;
  randomCounter: number;
};

export const create = (req: Request, res: Response) => {
  console.log(req.body.amount);
  const stock: Stock = {
    id: req.body.id,
    counter: req.body.counter,
    creationTime: req.body.creationTime,
    changeTime: req.body.changeTime,
    instrument: req.body.instrument,
    status: req.body.status,
    side: req.body.side,
    amount: req.body.amount,
    price: req.body.price,
    randomStatus: req.body.randomStatus,
    randomCounter: req.body.randomCounter,
  };

  Stock.create(stock)
    .then((data: any) => {
      console.log(data);
      res.send(data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message || "Some error occurred.",
      });
    });
};

export const findAll = (_: Request, res: Response) => {
  Stock.findAll()
    .then((data: any) => {
      console.log("RESPONSE!! ", data);
      res.send(data);
    })
    .catch((err: { message: any }) => {
      res.status(500).send({
        message: err.message || "Some error occurred while getting all posts.",
      });
    });
};

export const update = (req: Request, res: Response) => {
  const id = req.params.id;

  Stock.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num) {
        res.send({
          message: "Updated successfully.",
        });
      } else {
        res.send({
          message: `Maybe Stock was not found or req.body is empty!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

export const findOne = (req: Request, res: Response) => {
  const id = req.params.id;

  Stock.findByPk(id)
    .then((data: any) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find with id=${id}.`,
        });
      }
    })
    .catch((err: string) => {
      res.status(500).send({
        message: "Error retrieving with id=" + id + err,
      });
    });
};
