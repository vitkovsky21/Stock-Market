import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
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
  const classes = useStyles();
  const [currency, setCurrency] = useState("");
  const [sum, setSum] = useState("");

  const currentCurrency = currency.split(", ");

  const { data: stockData } = useGetStockQuery(currentCurrency);

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value as string);
  };

  const submit = () => {
    console.log("submit");
  };

  return (
    <Container maxWidth={"xs"}>
      <Paper className={classes.paper}>
        <Typography variant="h5" style={{ marginBottom: "12px" }}>
          Ticker
        </Typography>
        <form onSubmit={submit}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              label="Currency"
              onChange={handleChange}
            >
              <MenuItem value={"GBP, USD"}>GBP/USD</MenuItem>
              <MenuItem value={"EUR, USD"}>EUR/USD</MenuItem>
              <MenuItem value={"RUB, USD"}>RUB/USD</MenuItem>
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
                {!stockData ? "0" : stockData.rates.USD}
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.btn}
              >
                Sell
              </Button>
            </div>
            <div>
              <Typography className={classes.value}>
                {!stockData ? "0" : stockData.rates.USD}
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.btn}
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
