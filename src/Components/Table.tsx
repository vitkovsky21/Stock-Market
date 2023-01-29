import React, { useState } from "react";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const useStyles = makeStyles(() => ({
  paper: {
    textAlign: "center",
    boxShadow: "0px 0px 6px rgb(0 0 0 / 14%)",
    borderRadius: "12px",
    transform: "translate(-15%, 0%)",
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
  let clientMessages = useSelector((state: any) => state.message.clientMessage);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  if (!clientMessages[0]) {
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
                  0
                </TableCell>
                <TableCell>Empty</TableCell>
                <TableCell>Empty</TableCell>
                <TableCell>Empty</TableCell>
                <TableCell>Empty</TableCell>
                <TableCell>Empty</TableCell>
                <TableCell>Empty</TableCell>
                <TableCell>Empty</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  const messages = clientMessages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((msg: any) => {
    return (
      <TableRow key={msg.id}>
        <TableCell component="th" scope="row">
          {msg.id}
        </TableCell>
        <TableCell>{msg.creationTime}</TableCell>
        <TableCell>{msg.changeTime}</TableCell>
        <TableCell>{msg.status}</TableCell>
        <TableCell>{msg.side}</TableCell>
        <TableCell>{msg.price}</TableCell>
        <TableCell>{msg.amount}</TableCell>
        <TableCell>{msg.instrument}</TableCell>
      </TableRow>
    );
  });

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
            {messages}
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                count={clientMessages.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRowsPerPage(parseInt(e.target.value))
                }
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default StockTable;
