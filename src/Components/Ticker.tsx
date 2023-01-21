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
import React, { useState } from "react";

const useStyles = makeStyles(() => ({
  paper: {
    textAlign: "center",
    boxShadow: "0px 0px 6px rgb(0 0 0 / 14%)",
    borderRadius: "12px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "16px",
  },
  btn: {
    margin: '18px 0',
  },
  actions: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row"
  },
  value: {
    boxShadow: "0px 0px 6px rgb(0 0 0 / 14%)",
    borderRadius: "1px",
    padding: "12px 0",
    margin: "5px !important",
    width: "115px",
    position: "relative",
  }
}));

const Ticker = () => {
  const classes = useStyles();
  const [currency, setCurrency] = useState("");
  const [sum, setSum] = useState("");

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
              <MenuItem value={0}>CHN/RUB</MenuItem>
              <MenuItem value={1}>GBP/JPY</MenuItem>
              <MenuItem value={2}>USD/RUB</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="login"
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
                62
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
                64
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
