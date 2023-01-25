import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(() => ({
  paper: {
    textAlign: "center",
    boxShadow: "0px 0px 6px rgb(0 0 0 / 14%)",
    borderRadius: "12px",
    transform: "translate(-15%, -28%)",
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

const StockTable = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5" style={{ marginBottom: "12px" }}>
        Table
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Creation Time</TableCell>
              <TableCell>Change Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Side</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Instrument</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                1
              </TableCell>
              <TableCell>{+new Date()}</TableCell>
              <TableCell>{+new Date()}</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Buy</TableCell>
              <TableCell>1.22</TableCell>
              <TableCell>10 000.00</TableCell>
              <TableCell>GBP/USD</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StockTable;
