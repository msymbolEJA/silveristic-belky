import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import TableContainer from "@material-ui/core/TableContainer";

import {
  Paper,
  Grid,
  Table,
  // Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@material-ui/core";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
    maxWidth: "300px",
  },
  table: {
    minWidth: 150,
  },
  tableRow: {
    cursor: "pointer",
    "&:nth-of-type(odd)": {
      backgroundColor: "#efefef",
    },
    "&:hover": {
      background: "#e2f1e5",
    },
  },
  paper: {
    border: "1px solid lightgrey",
    borderRadius: "5px",
    padding: "10px",
  },
  icon: {
    fontSize: 40,
    display: "inline",
  },
  button: {
    height: "2rem ",
    minWidth: "8rem",
  },
  titleStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#add8e6",
      borderRadius: "0.5rem 0.5rem 0 0",
      // fontSize: "1.1rem",
      transition: "1s",
    },
    minHeight: "6rem",
  },
  tContainer: {
    marginRight: "5px",
    width: "100%",
  },
  thead: {
    backgroundColor: "#6495ED",
    "& .MuiTableCell-alignLeft": {
      height: "50px",
    },
  },
}));

export default function SummaryTable({
  title,
  next,
  icon,
  header1,
  header2,
  data,
  lastDateOfOrder,
  healthCheck,
}) {
  // const { user } = useContext(AppContext);

  let total =
    (data !== "noOrders" &&
      data?.length > 0 &&
      data.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.cell2;
      }, 0)) ||
    0;

  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.push(next);
  };

  return (
    <Grid item xs={12} md={6} className={classes.root}>
      <div
        className={classes.paper}
        onClick={title === "orders" ? null : handleClick}
      >
        <div className={classes.titleStyle} onClick={(e) => handleClick(e)}>
          {icon}
          <h3 style={{ display: "inline", marginLeft: "0.5rem" }}>
            <FormattedMessage id={title} defaultMessage={title} /> ({total})
          </h3>
        </div>
        <div>
          <TableContainer className={classes.tContainer}>
            <Table className={classes.table}>
              <TableHead className={classes.thead}>
                <TableRow>
                  <TableCell align="left" className={classes.tableCellHeader}>
                    {header1}
                  </TableCell>
                  <TableCell align="right" className={classes.tableCellHeader}>
                    {header2}
                  </TableCell>
                </TableRow>
              </TableHead>
              {data?.length ? (
                <TableBody>
                  {data === "noOrders" ? (
                    <TableRow>
                      <TableCell
                        colSpan="2"
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <FormattedMessage
                          id="everythingOnSchedule"
                          defaultMessage="EVERYTHING IS ON SCHEDULE"
                        />
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((item, index) => (
                      <TableRow
                        key={index}
                        className={classes.tableRow}
                        style={{
                          cursor: title === "orders" ? "default" : "pointer",
                        }}
                        // onClick={() =>
                        //   title === "orders"
                        //     ? history.push(
                        //         `/all-orders?&status=${item.cell1.toLowerCase()}&limit=2500&offset=0`
                        //       )
                        //     : null
                        // }
                      >
                        <TableCell align="left" component="th" scope="row">
                          {title === "orders" ? (
                            <FormattedMessage
                              id={
                                item.cell1.toLowerCase() === "awaiting"
                                  ? "approved"
                                  : item.cell1.toLowerCase()
                              }
                              defaultMessage={
                                item.cell1.toLowerCase() === "awaiting"
                                  ? "APPROVED"
                                  : item.cell1
                              }
                            />
                          ) : (
                            item.cell1
                          )}
                        </TableCell>
                        <TableCell align="right">{item.cell2}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="2" style={{ display: "table-cell" }}>
                      <CircularProgress
                        style={{ marginTop: "1rem", marginBottom: "1rem" }}
                      />
                    </td>
                  </tr>
                </tbody>
              )}
            </Table>
          </TableContainer>
        </div>
      </div>
    </Grid>
  );
}
