import React, { useEffect, useRef, useState } from "react";

import {
  Button,
  Container,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch } from "react-redux";
import { addMessage } from "../Reducers/message";
import { useGetStockQuery } from "../Services/stockApi";
import {
  useGetTableMsgQuery,
  usePostTableMsgMutation,
  useUpdateTableMsgMutation,
} from "../Services/tableApi";

const useStyles = makeStyles(() => ({
  paper: {
    textAlign: "center",
    boxShadow: "0px 0px 6px rgb(0 0 0 / 14%)",
    borderRadius: "12px",
    padding: "16px",
  },
  btn: {
    margin: "18px 0",
  },
  actions: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  value: {
    boxShadow: "0px 0px 6px rgb(0 0 0 / 14%)",
    borderRadius: "1px",
    padding: "12px 0",
    margin: "5px !important",
    width: "115px",
    position: "relative",
  },
}));

const Ticker = () => {
  const webSocket: any = useRef(null);
  const dispatch = useDispatch();

  let clientMessage: any;

  const classes = useStyles();

  const [currency, setCurrency] = useState("");
  const [sum, setSum] = useState("");
  const [counter, setCounter] = useState(1);

  const [addPostMessage] = usePostTableMsgMutation();
  const [addUpdateMessage] = useUpdateTableMsgMutation();

  const currentCurrency = currency.split("/");

  const { data: stockData } = useGetStockQuery(currentCurrency);

  let { data: clientMsgs } = useGetTableMsgQuery();
  const [clientMessages, setClientMessages] = useState<any>();

  setTimeout(() => {
    setClientMessages(clientMsgs);
    dispatch(addMessage(clientMessages));
  }, 200);

  useEffect(() => {
    console.log("Opening Websocket");
    webSocket.current = new WebSocket("ws://localhost:8000");

    webSocket.current.onopen = (event: any) => {
      console.log("Open: ", event);
    };

    webSocket.current.onclose = (event: any) => {
      console.log("Close: ", event);
    };

    return () => {
      console.log("Closing.");
      webSocket.current.close();
    };
  }, []);

  useEffect(() => {
    webSocket.current.onmessage = (event: any) => {
      let res = JSON.parse(event.data);

      addUpdateMessage(res);

      setTimeout(() => {
        dispatch(addMessage(clientMessages));
      }, 200);

      setTimeout(() => {
        const randomStatus = res.randomStatus ? "Filled" : "Rejected";

        let msg =
          clientMessages[Math.floor(Math.random() * clientMessages.length + 1)];

        if (msg) {
          let msgToPost = {
            id: msg.id,
            counter: msg.counter,
            creationTime: msg.creationTime,
            changeTime: new Date().toLocaleString(),
            instrument: msg.instrument,
            status: randomStatus,
            side: msg.side,
            amount: msg.amount,
            price: msg.price,
            randomStatus: msg.randomStatus,
            randomCounter: msg.randomCounter,
          };

          addUpdateMessage(msgToPost);

          setTimeout(() => {
            dispatch(addMessage(clientMessages.sort()));
          }, 200);
        }
      }, res.randomCounter);
    };
  }, [clientMessages]);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
  };

  const postMessage = (props: string) => {
    clientMessage = {
      counter: counter,
      creationTime: new Date().toLocaleString(),
      changeTime: new Date().toLocaleString(),
      instrument: currency,
      status: "Active",
      side: props,
      amount: sum,
      // price: stockData.rates.USD - так должно быть, но я исчерпал лимит запросов к API, пока делал проект :)
      price: 1.2524,
      randomStatus: Math.random() * (20 - 10) + 10 > 15,
      randomCounter: Math.floor(Math.random() * (15000 - 5000) + 5000),
    };

    setCounter((counter) => counter++);

    webSocket.current.send(JSON.stringify(clientMessage));

    addPostMessage(clientMessage);
  };

  return (
    <Container maxWidth={"xs"}>
      <Paper className={classes.paper}>
        <Typography variant="h5" style={{ marginBottom: "12px" }}>
          Ticker
        </Typography>
        <form>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              label="Currency"
              onChange={handleChange}
            >
              <MenuItem value={"GBP/USD"}>GBP/USD</MenuItem>
              <MenuItem value={"EUR/USD"}>EUR/USD</MenuItem>
              <MenuItem value={"RUB/USD"}>RUB/USD</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            label="Enter Value"
            margin="normal"
            value={sum}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSum(e.target.value)
            }
            autoFocus
            fullWidth
          />
          <div className={classes.actions}>
            <div>
              <Typography className={classes.value}>
                {!stockData ? (
                  <LinearProgress color="inherit" />
                ) : (
                  stockData.rates.USD
                )}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={() => postMessage("Sell")}
              >
                Sell
              </Button>
            </div>
            <div>
              <Typography className={classes.value}>
                {!stockData ? (
                  <LinearProgress color="inherit" />
                ) : (
                  stockData.rates.USD
                )}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={() => postMessage("Buy")}
              >
                Buy
              </Button>
            </div>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default Ticker;
