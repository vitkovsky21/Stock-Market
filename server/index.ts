import dotenv from "dotenv";
import cors from "cors";
import { v4 as uuid } from "uuid";
import ws from "ws";

const { Server }: any = ws;
const clients: any = {};

const wss = new Server({ port: 8000 });
wss.on("connection", (ws: any) => {
  console.log("hello");
  const id = uuid();
  clients[id] = ws;

  console.log(`Welcome, ${id}`);

  ws.on(
    "message",
    function message(data: { toString: () => any }, isBinary: any) {
      const message = isBinary ? data : data.toString();
      console.log(message);
      wss.clients.forEach((client: any) => {
        client.send(message)
      });
    }
  );

  ws.on("close", () => {
    delete clients[id];
    console.log(`Goodbye, ${id}`);
  });
});

dotenv.config();

import express from "express";

import { startBackWithBase } from "./db";

import stockRouter from "./app/routes/stock.routes";

const app = express();

var corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/stock", stockRouter);

startBackWithBase();
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to an application." });
  console.log(req);
});

const port = Number(process.env.SERVER_PORT) || 3001;
app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
