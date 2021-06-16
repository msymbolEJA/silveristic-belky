import React, { useState, useEffect, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import CustomTableCell from "./CustomTableCell";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { getOnePdf, getData, putData } from "../../helper/PostData";
import OrderDetailsCargoPage from "./OrderDetailsCargoPage";
import moment from "moment";
import { FormattedMessage, useIntl } from "react-intl";
import { AppContext } from "../../context/Context";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL_MAPPING = process.env.REACT_APP_BASE_URL_MAPPING;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles(() => ({
  root: {
    // marginTop: "50px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
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
  labels: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1.5rem",
  },
  tContainer: {
    // margin: "10px",
    width: "calc(100vw - 10px)",
  },
  logDiv: {
    display: "flex",
    justifyContent: "center",
  },
  logTContainer: {
    // margin: "10px",
    maxWidth: "1200px",
  },
  thead: {
    backgroundColor: "#6495ED",
  },
  header: {
    fontSize: "1.5rem",
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
  },
  found: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: 5,
  },
  printBtn: {
    width: "100%",
    backgroundColor: "#007BFF",
    color: "white",
    textTransform: "none",
    marginTop: 20,
    "&:hover": {
      backgroundColor: "#0069D9",
    },
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
}));

const OrderDetails = ({ match }) => {
  const [rows, setRows] = useState([]);
  const { user } = useContext(AppContext);

  const [logs, setLogs] = useState([]);
  const [isPdfExist, setIsPdfExist] = useState(false);
  // console.log("isPdfExist", isPdfExist);
  const [refresh, setRefresh] = useState(false);
  const classes = useStyles();
  const { formatMessage } = useIntl();
  const localRole = localStorage.getItem("localRole");

  const userRole = user?.role || localRole;

  const getPdf = () => {
    let data = match.params.id;
    getOnePdf(`${BASE_URL}etsy/print_one/`, data)
      .then((res) => {
        //console.log(res.data.url);
        const link = document.createElement("a");
        link.href = `${res.data.url}`;
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        //console.log(rows[0].id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch(`${BASE_URL}media/pdf/${match.params.id}.pdf`)
      .then((res) => {
        if (res.status !== 404) {
          setIsPdfExist(true);
        }
      })
      .catch((err) => console.log("err", err));

    let url = `${BASE_URL}etsy/orders/${match.params.id}/`;
    let urlLogs = `${BASE_URL}etsy/dateLogs/${match.params.id}/`;
    getData(url)
      .then((res) => {
        setRows([res.data]);
      })
      .then(() => {
        getData(urlLogs).then((res) => {
          setLogs(res.data.results);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [match.params.id, refresh]);

  const handleSendToStock = () => {
    const newData = {
      status: "cancelled",
      note: rows[0]?.note + " - SENT TO STOCKS!",
    };
    handleStockChange(rows[0]?.id, newData);
  };
  const handleSoldFromStock = () => {
    const newData = {
      status: "shipped",
      note: rows[0]?.note + " - SOLD FROM STOCKS!",
    };
    handleStockChange(rows[0]?.id, newData);
  };

  const handleStockChange = (id, data) => {
    putData(`${BASE_URL_MAPPING}${id}/`, data)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setRefresh(!refresh));
  };

  const formMesFunc = (data) => {
    try {
      return formatMessage({
        id: data,
        defaultMessage: data,
      });
    } catch (error) {
      return data;
    }
  };

  return (
    <div>
      <div className={classes.header}>
        <Typography className={classes.header}>
          <FormattedMessage id="orderDetails" defaultMessage="Order Details" />
        </Typography>
        {userRole === "admin" ||
        userRole === "shop_manager" ||
        userRole === "shop_packer" ? (
          <>
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={handleSendToStock}
            >
              <FormattedMessage
                id="sendToStock"
                defaultMessage="Send To Stock"
              />
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={handleSoldFromStock}
            >
              <FormattedMessage
                id="soldFromStock"
                defaultMessage="Sold from Stock"
              />
            </Button>
          </>
        ) : null}
      </div>
      <div className={classes.paper}>
        <TableContainer className={classes.tContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.thead}>
              <TableRow>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage id="id" defaultMessage="Id" />
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage
                    id="receiptId"
                    defaultMessage="Receipt Id"
                  />
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage id="date" defaultMessage="Date" />
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage id="status" defaultMessage="Status" />
                </TableCell>
                {userRole === "admin" ||
                userRole === "shop_manager" ||
                userRole === "shop_packer" ? (
                  <>
                    <TableCell
                      className={classes.tableCellHeader}
                      align="center"
                    >
                      <FormattedMessage id="buyer" defaultMessage="Buyer" />
                    </TableCell>
                    <TableCell
                      className={classes.tableCellHeader}
                      align="center"
                    >
                      <FormattedMessage
                        id="supplier"
                        defaultMessage="Supplier"
                      />
                    </TableCell>
                  </>
                ) : null}
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage id="type" defaultMessage="Type" />
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage id="length" defaultMessage="Length" />
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage id="color" defaultMessage="Color" />
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage id="quantity" defaultMessage="Quantity" />
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage id="size" defaultMessage="Size" />
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage id="start" defaultMessage="Start" />
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage
                    id="explanation"
                    defaultMessage="Explanation"
                  />
                </TableCell>
                <TableCell className={classes.tableCellHeader} align="center">
                  <FormattedMessage id="note" defaultMessage="Note" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows ? (
                rows?.map((row) => (
                  <StyledTableRow key={row.id} id={row.id}>
                    <CustomTableCell {...{ row, name: "id" }} />
                    <CustomTableCell
                      {...{ row, name: "receipt_id", name2: "is_repeat" }}
                    />
                    <CustomTableCell {...{ row, name: "created_date" }} />
                    <CustomTableCell {...{ row, name: "status" }} />
                    {userRole === "admin" ||
                    userRole === "shop_manager" ||
                    userRole === "shop_packer" ? (
                      <>
                        <CustomTableCell {...{ row, name: "buyer" }} />
                        <CustomTableCell {...{ row, name: "supplier" }} />
                      </>
                    ) : null}
                    <CustomTableCell {...{ row, name: "type" }} />
                    <CustomTableCell {...{ row, name: "length" }} />
                    <CustomTableCell {...{ row, name: "color" }} />
                    <CustomTableCell {...{ row, name: "qty" }} />
                    <CustomTableCell {...{ row, name: "size" }} />
                    <CustomTableCell {...{ row, name: "start" }} />
                    <CustomTableCell {...{ row, name: "explanation" }} />
                    <CustomTableCell {...{ row, name: "note" }} />
                  </StyledTableRow>
                ))
              ) : (
                <tr>
                  <td colSpan="13" style={{ fontSize: "2rem" }}>
                    <FormattedMessage
                      id="nothingFound"
                      defaultMessage="Nothing Found!"
                    />
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {rows[0]?.status === "ready" ? (
        <OrderDetailsCargoPage id={match.params.id} setRefresh={setRefresh} />
      ) : null}
      {rows[0]?.status === "awaiting" ? (
        <>
          <Button
            onClick={getPdf}
            variant="contained"
            color="primary"
            className={classes.printSubmit}
          >
            Print
          </Button>
        </>
      ) : null}

      {["in_progress", "ready", "in_transit", "shipped"].includes(
        rows[0]?.status
      ) && isPdfExist ? (
        <>
          <a
            href={`${BASE_URL}media/pdf/${match.params.id}.pdf`}
            target="_blank"
            rel="noreferrer"
          >
            <FormattedMessage
              id="openPrintedPDF"
              defaultMessage="Open Printed Pdf"
            />
          </a>
        </>
      ) : (
        <div className={classes.logDiv}>
          <h2>
            <FormattedMessage id="noPdfFiles" />
          </h2>
        </div>
      )}
      <div className={classes.logDiv}>
        <TableContainer component={Paper} className={classes.logTContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.thead}>
              <TableRow>
                <TableCell align="center" className={classes.tableCellHeader}>
                  <FormattedMessage id="date" defaultMessage="Date" />
                </TableCell>
                <TableCell align="center" className={classes.tableCellHeader}>
                  <FormattedMessage id="user" defaultMessage="User" />
                </TableCell>
                <TableCell align="center" className={classes.tableCellHeader}>
                  <FormattedMessage id="action" defaultMessage="Action" />
                </TableCell>
                <TableCell align="center" className={classes.tableCellHeader}>
                  <FormattedMessage id="logData" defaultMessage="Log Data" />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.length > 0 ? (
                logs.reverse().map((log, i) => (
                  <TableRow
                    key={i}
                    className={i % 2 === 1 ? classes.darkTableRow : null}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {moment
                        .utc(log.change_date)
                        .local()
                        .format("MM-DD-YY HH:mm")}
                    </TableCell>
                    <TableCell align="center">{log.user}</TableCell>
                    <TableCell align="center">
                      {formatMessage({
                        id: log.type,
                        defaultMessage: log.type?.replace("_", " "),
                      })}
                    </TableCell>
                    <TableCell align="center">
                      {formMesFunc(log.data)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <tr>
                  <td colSpan="4">
                    <FormattedMessage id="noLogs" />
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default OrderDetails;
