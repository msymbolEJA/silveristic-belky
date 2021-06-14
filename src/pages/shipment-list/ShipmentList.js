import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { shipmentListColumns } from "../../helper/Constants";
import { getData } from "../../helper/PostData";
import { Link } from "react-router-dom";

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
}));

const ShippedOrders = () => {
  const classes = useStyles();
  const [rows, setRows] = useState();

  const getOrders = () => {
    getData(`${BASE_URL}etsy/cargo_list/`).then((response) => {
      let dataObj = response.data;
      const formattedData = dataObj
        ? Object.keys(dataObj).map((key) => {
            return Object.keys(dataObj[key]).map((key2) => ({
              ...dataObj[key][key2],
              refNumber: key2,
            }));
          })
        : [];
      console.log(formattedData[0]);

      setRows(formattedData[0]);
    });
  };

  // const tnFunc = (tn, carrier) => {
  //   if (carrier.includes("DHL") || carrier.includes("DHL")) {
  //     return `https://www.dhl.com/en/express/tracking.html?AWB=${tn}&brand=DHL`;
  //   } else if (carrier.includes("UPS") || carrier.includes("ups")) {
  //     return `https://www.ups.com/track?tracknum=${tn}`;
  //   } else {
  //     return tn;
  //   }
  // };

  useEffect(() => {
    getOrders();

    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <TableContainer className={classes.tContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.thead}>
              <TableRow>
                {shipmentListColumns?.map((item) => (
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
              {rows === null ? (
                <TableRow>
                  <TableCell align="center" colSpan={14}>
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                rows?.map((row, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 === 1 ? classes.darkTableRow : null}
                  >
                    {shipmentListColumns?.map((item, i) => (
                      <TableCell
                        key={i}
                        className={classes.tableCell}
                        align="center"
                      >
                        {item?.objKey === "id" ? (
                          <>
                            <a
                              href={`shipment?id=${row[item?.objKey]}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {row[item?.objKey]}
                            </a>
                          </>
                        ) : // ) : item?.objKey === "tracking_number" ? (
                        //   tnFunc(row[item?.objKey], row[item?.carrier])
                        item?.objKey === "content" ? (
                          row[item?.objKey]?.length
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
};

export default ShippedOrders;