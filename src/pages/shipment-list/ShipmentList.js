import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { shipmentListColumns } from "../../helper/Constants";
import { getData, putData } from "../../helper/PostData";
import EditableTableCell from "../../components/newitems/EditableCell";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
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
    cursor: "pointer",
  },
  lightTableRow: {
    cursor: "pointer",
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

const ShippedOrders = () => {
  const classes = useStyles();
  const [rows, setRows] = useState();
  const [supplierFilter, setSupplierFilter] = useState("all");
  const history = useHistory();

  const getOrders = useCallback(() => {
    getData(`${BASE_URL}etsy/cargo_list/`).then((response) => {
      // console.log({response})
      let dataObj = response.data;
      const formattedData = dataObj
        ? Object.keys(dataObj).map((key) => {
            return Object.keys(dataObj[key]).map((key2) => ({
              ...dataObj[key][key2],
              refNumber: key2,
            }));
          })
        : [];
      //  console.log("formattedData",formattedData);
      let newFormData = [];
      if (supplierFilter === "all") {
        newFormData =
          formattedData?.[0]?.length && formattedData?.[1]?.length
            ? [...formattedData[0], ...formattedData[1]]
            : formattedData?.[0]?.length
            ? [...formattedData[0]]
            : formattedData[0];
      } else if (supplierFilter === "asya" && formattedData?.[1]?.length) {
        newFormData = formattedData[1];
        // console.log("aaaaa",formattedData[1])
      } else {
        newFormData = formattedData[0];
        // console.log("bbbbbbb",formattedData[0])
      }
      // console.log("--NFD--",newFormData)

      setRows(newFormData);
    });
  }, [supplierFilter]);

  useEffect(() => {
    getOrders();
    // console.log(supplierFilter)
    setRows([]);
  }, [supplierFilter]);

  const tnFunc = (tn, carrier) => {
    if (carrier.toUpperCase().includes("DHL")) {
      return `https://www.dhl.com/en/express/tracking.html?AWB=${tn}&brand=DHL`;
    } else if (carrier.toUpperCase().includes("UPS")) {
      return `https://www.ups.com/track?tracknum=${tn}`;
    } else {
      return tn;
    }
  };

  const handleRowChange = useCallback(
    (id, data) => {
      // console.log(id,data)
      if (!data) return;
      putData(`${BASE_URL}etsy/shipments/${id}/`, data)
        .then((response) => {
          //  console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => getOrders());
    },
    [getOrders]
  );

  const onChange = (e, id, name) => {
    //  console.log("onChange",id, name);
    handleRowChange(id, { [name]: e.target.innerText });
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, []);

  const handleRowClick = (id) => {
    history.push(`/cargo-content/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.headerDiv}>
        <div className={classes.btnGroup}>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setSupplierFilter("all")}
          >
            All
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setSupplierFilter("asya")}
          >
            Asya
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => setSupplierFilter("beyazit")}
          >
            Beyazit
          </Button>
        </div>
      </div>
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
                    className={
                      index % 2 === 1
                        ? classes.darkTableRow
                        : classes.lightTableRow
                    }
                    onClick={() => handleRowClick(row.id)}
                  >
                    {shipmentListColumns?.map((item, i) => (
                      <TableCell
                        key={i}
                        className={classes.tableCell}
                        align="center"
                      >
                        {item?.objKey === "carrier" ? (
                          <EditableTableCell
                            {...{
                              row,
                              name: item?.objKey,
                              onChange,
                            }}
                          />
                        ) : item?.objKey === "id" ? (
                          <>{row[item?.objKey]}</>
                        ) : item?.objKey === "tracking_number" ? (
                          <EditableTableCell
                            align="center"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            {...{
                              row,
                              name: "tracking_number",
                              onChange,
                              trackingNumber: tnFunc(
                                row[item?.objKey],
                                row.carrier
                              ),
                            }}
                          />
                        ) : item?.name === "Adet" ? (
                          row[item?.objKey].length
                        ) : item?.name === "????erik" ? (
                          row[item?.objKey].map((key, i) => (
                            <span
                              key={i}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <a
                                href={`/order-details/${key}/`}
                                key={i}
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                              >
                                {key}
                              </a>
                              {" - "}
                              {(i + 1) % 10 === 0 ? <br /> : null}
                            </span>
                          ))
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
