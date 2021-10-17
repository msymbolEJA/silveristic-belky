import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { getData } from "../../helper/PostData";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import customColors from "../../helper/Colors";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    textTransform: "none",
    marginRight: "5px",
    "&:hover": {
      backgroundColor: "#0069D9",
    },
  },
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  thead: {
    backgroundColor: customColors.cornFlowerBlue,
  },
  header: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "0px",
    margin: 5,
    marginTop: 15,
  },
  headerDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "fit-content",
    marginLeft: "0.5rem",
  },

  table: {
    width: "calc(100% - 50px)",
    margin: "20px",
  },
  tableCellHeader: {
    fontFamily: "Courier New",
    fontWeight: "bold",
    border: "1px solid #DEE2E6",
  },
  tableCell: {
    fontFamily: "Courier New",
    border: "1px solid #DEE2E6",
  },
  darkTableRow: {
    backgroundColor: "#F2F2F2",
  },
  paper: {
    border: "1px solid lightgrey",
    borderRadius: "5px",
  },
  root: {
    flexGrow: 1,
    // cursor: "pointer",
    margin: 0,
    marginTop: 10,
    minWidth: "400px",
  },
  tableDiv: {
    margin: "10px",
  },
}));

export default function CustomizedTables() {
  const classes = useStyles();
  const [cargoList, setCargoList] = useState({});
  const [supplier, setSupplier] = useState("");

  useEffect(() => {
    getData(`${BASE_URL}etsy/due_dates/?supplier=${supplier}`).then(
      (response) => {
        // console.log(response.data);
        setCargoList(response.data);
      }
    );
  }, [supplier]);

  return (
    <Grid item xs={12} md={12} className={classes.root}>
      <div className={classes.headerDiv}>
        <h1 className={classes.header}>Üretim Takip</h1>
        <div className={classes.btnGroup}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setSupplier("")}
          >
            All
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setSupplier("asya")}
          >
            Asya
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setSupplier("beyazit")}
          >
            Beyazit
          </Button>
        </div>
      </div>
      <div className={classes.tableDiv}>
        <Paper className={classes.paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead className={classes.thead}>
              <TableRow>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage id="date" defaultMessage="DATE" />
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage id="quantity" defaultMessage="Quantity" />
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage id="orders" defaultMessage="Orders" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(cargoList).map((item, index) => (
                <TableRow
                  style={{
                    backgroundColor: cargoList[item].is_late
                      ? "#FF9494"
                      : "white",
                  }}
                  key={index}
                >
                  <TableCell align="center" className={classes.tableCell}>
                    {item}
                  </TableCell>
                  {/* <TableCell align="left">
                  {cargoList[item].is_late}
                </TableCell> */}
                  <TableCell align="center" className={classes.tableCell}>
                    {cargoList[item].values.length}
                  </TableCell>
                  <TableCell align="center" className={classes.tableCell}>
                    {cargoList[item].values.map((key, i) => (
                      <span key={i}>
                        <a href={`/order-details/${key}`} key={i}>
                          {key}
                        </a>{" "}
                        - {(i + 1) % 8 === 0 ? <br /> : null}
                      </span>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </Grid>
  );
}
