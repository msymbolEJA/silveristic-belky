import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { getData } from "../../helper/PostData";
import Typography from "@material-ui/core/Typography";
import { cargoContentTableColumns } from "../../helper/Constants";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles(() => ({
  header: {
    margin: 8,
    padding: 0,
  },
  root: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 60,
  },
  paper: {
    border: "2px solid #F2F2F2",
    borderRadius: "5px",
  },
  tContainer: {
    marginRight: "5px",
    width: "calc(100vw - 20px)",
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
  lightTableRow: {},
  thead: {
    backgroundColor: "#6495ED",
  },
  input: {
    backgroundColor: "#ADD8E6",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  inputDiv: {
    display: "flex",
    justifyContent: "center",
  },
  headerDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "fit-content",
  },
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
}));

export default function CustomizedTables({ match }) {
  const classes = useStyles();
  const [cargoList, setCargoList] = useState([]);

  useEffect(() => {
    if (match?.params?.id)
      getData(`${BASE_URL}etsy/shipment/?id=${match.params.id}`).then(
        (response) => {
          setCargoList(response.data);
        }
      );
  }, [match?.params?.id]);

  return (
    <div className={classes.root}>
      <h2 className={classes.header} variant="h3">
        Cargo Content
      </h2>
      <div className={classes.paper}>
        <TableContainer className={classes.tContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.thead}>
              <TableRow>
                {cargoContentTableColumns?.map((item) => (
                  <TableCell
                    className={classes.tableCellHeader}
                    align="center"
                    key={item.id}
                  >
                    {item.name} {item?.name2 ? `/ ${item?.name2}` : null}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cargoList === null ? (
                <TableRow>
                  <TableCell align="center" colSpan={14}>
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                cargoList?.map((row, index) => (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 1
                        ? classes.darkTableRow
                        : classes.lightTableRow
                    }
                  >
                    {cargoContentTableColumns?.map((item, i) => (
                      <TableCell
                        key={i}
                        className={classes.tableCell}
                        align="center"
                      >
                        {item?.objKey === "id" ? (
                          <a href={`/order-details/${row[item?.objKey]}`}>
                            {row[item?.objKey]}
                          </a>
                        ) : (
                          row[item?.objKey]
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
