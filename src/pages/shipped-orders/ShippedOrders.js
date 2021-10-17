import { useEffect, useState, useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { tableColumns } from "../../helper/Constants";
import { getData } from "../../helper/PostData";
import moment from "moment";
import BarcodeInput from "../../components/otheritems/BarcodeInput";
import { Link } from "react-router-dom";
import customColors from "../../helper/Colors";

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
    border: "1px solid lightgrey",
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
    backgroundColor: customColors.cornFlowerBlue,
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
  barcodePar: {
    fontSize: "1rem",
    margin: 0,
    marginTop: 3,
    marginRight: 10,
    padding: 0,
  },
}));

const ShippedOrders = () => {
  const classes = useStyles();
  const [rows, setRows] = useState();
  const [barcodeInput, setBarcodeInput] = useState();
  const barcodeInputRef = useRef();

  const getOrders = () => {
    getData(
      `${BASE_URL}etsy/orders/?status=shipped&limit=100&offset=0&ordering=-last_updated`
    ).then((response) => {
      setRows(response.data.results);
    });
  };

  useEffect(() => {
    getOrders();

    // eslint-disable-next-line
  }, []);

  const handleBarcodeInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log(barcodeInputRef.current.value);
      setBarcodeInput(barcodeInputRef.current.value);
    }
  };

  const handleError = useCallback((err) => {
    console.error(err);
  }, []);

  const handleScan = useCallback((data) => {
    setBarcodeInput(data);
    barcodeInputRef.current.value = data;
  }, []);

  return (
    <div className={classes.root}>
      <h1 className={classes.header}>Shipped Order</h1>
      <h2 className={classes.header}>Only Last 100 order is displayed</h2>
      <h3 className={classes.header}>100 result found !</h3>
      <div className={classes.inputDiv}>
        <BarcodeInput onError={handleError} onScan={handleScan} />
        <p className={classes.barcodePar}>{barcodeInput}</p>
        <input
          type="text"
          className={classes.input}
          ref={barcodeInputRef}
          onKeyDown={handleBarcodeInputKeyDown}
        />
      </div>
      <div className={classes.paper}>
        <TableContainer className={classes.tContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.thead}>
              <TableRow>
                {tableColumns?.map((item) => (
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
                    key={row?.id}
                    className={index % 2 === 1 ? classes.darkTableRow : null}
                  >
                    {tableColumns?.map((item, i) => (
                      <TableCell
                        key={i}
                        className={classes.tableCell}
                        align="center"
                      >
                        {item?.objKey === "creation_tsz" ? (
                          moment(row[item?.objKey]).format("MM-DD-YY HH:mm") ===
                          "Invalid date" ? (
                            row[item?.objKey]
                          ) : (
                            moment
                              .utc(row[item?.objKey])
                              .local()
                              .format("MM-DD-YY HH:mm")
                          )
                        ) : item?.objKey === "created_date" ? (
                          moment(row[item?.objKey]).format("MM-DD-YY HH:mm") ===
                          "Invalid date" ? (
                            row[item?.objKey]
                          ) : (
                            moment
                              .utc(row[item?.objKey])
                              .local()
                              .format("MM-DD-YY HH:mm")
                          )
                        ) : item?.name === "No" ? (
                          <Link to={`/orders/${row[item?.objKey]}`}>
                            {row[item?.objKey]}
                          </Link>
                        ) : (
                          row[item?.objKey]
                        )}
                        {item?.objKey2 ? (
                          <div>
                            <br /> {row[item?.objKey2]}
                          </div>
                        ) : null}
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
