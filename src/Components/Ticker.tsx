import {
  Button,
  CircularProgress,
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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage, updateMessage } from "../Reducers/message";
import { useGetStockQuery } from "../Services/stockApi";

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

  const currentCurrency = currency.split("/");

  const { data: stockData } = useGetStockQuery(currentCurrency);

  useEffect(() => {
    console.log("Opening Websocket");
    webSocket.current = new WebSocket("ws://localhost:8000");

    webSocket.current.onopen = (event: any) => {
      console.log("Open: ", event);
    };

    webSocket.current.onclose = (event: any) => {
      console.log("Close: ", event);
    };

    webSocket.current.onmessage = (event: any) => {
      let res = JSON.parse(event.data);
      dispatch(addMessage(res));

      setTimeout(() => {
        dispatch(
          updateMessage(
            Math.random() * (20 - 10) + 10 > 15 ? "Filled" : "Rejected"
          )
        );
      }, Math.floor(Math.random() * (15000 - 5000) + 5000));
    };

    return () => {
      console.log("Closing.");
      webSocket.current.close();
    };
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
  };

  const postMessage = (props: string) => {
    clientMessage = {
      id: counter,
      creationTime: new Date().toLocaleString(),
      changeTime: new Date().toLocaleString(),
      instrument: currency,
      status: "Active",
      side: props,
      amount: sum,
      price: stockData.rates.USD,
    };

    setCounter((counter) => counter + 1);
    webSocket.current.send(JSON.stringify(clientMessage));
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
                {!stockData ? <LinearProgress color="inherit" /> : stockData.rates.USD}
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
                {!stockData ? <LinearProgress color="inherit" /> : stockData.rates.USD}
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
