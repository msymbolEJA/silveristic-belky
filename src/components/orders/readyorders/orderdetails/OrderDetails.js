import React, { useState, useEffect, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import CustomTableCell from "../CustomTableCell";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { getOnePdf, getData, putData } from "../../../../helper/PostData";
import OrderDetailsCargoPage from "./OrderDetailsCargoPage";
import moment from "moment";
import { FormattedMessage, useIntl } from "react-intl";
import { AppContext } from "../../../../context/Context";

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: 30,
    overflowX: "auto",
  },
  rootBottom: {
    backgroundColor: "lightgrey",
    minHeight: "10vh",
    margin: "5vw",
  },
  container: {
    // maxHeight: "83vh",
  },
  table: {
    minWidth: 650,
    marginBottom: "2rem",
  },
  table2: {
    maxWidth: 950,
    margin: "auto",
    border: "1px solid black",
  },
  selectTableCell: {
    width: 60,
  },
  buttonGroup: {
    marginBottom: theme.spacing(1),
  },
  header: {
    fontSize: "2.5rem",
    marginLeft: "0.5rem",
  },
  sub: {
    fontSize: "1rem",
  },
  printSubmit: {
    marginTop: theme.spacing(5),
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
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
      <Paper className={classes.root}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography className={classes.header}>
            <FormattedMessage
              id="orderDetails"
              defaultMessage="Order Details"
            />
          </Typography>
          {userRole === "admin" ||
          userRole === "shop_manager" ||
          userRole === "shop_packer" ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  marginRight: "0.5rem",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    variant="contained"
                    color="primary"
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
                    color="secondary"
                    size="small"
                    className={classes.button}
                    style={{ marginTop: "0.3rem", marginBottom: "0.2rem" }}
                    onClick={handleSoldFromStock}
                  >
                    <FormattedMessage
                      id="soldFromStock"
                      defaultMessage="Sold from Stock"
                    />
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </div>

        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            stickyHeader
            aria-label="sticky table"
            size="small"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  <FormattedMessage id="id" defaultMessage="Id" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage
                    id="receiptId"
                    defaultMessage="Receipt Id"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="date" defaultMessage="Date" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="status" defaultMessage="Status" />
                </StyledTableCell>
                {userRole === "admin" ||
                userRole === "shop_manager" ||
                userRole === "shop_packer" ? (
                  <>
                    <StyledTableCell align="center">
                      <FormattedMessage id="buyer" defaultMessage="Buyer" />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <FormattedMessage
                        id="supplier"
                        defaultMessage="Supplier"
                      />
                    </StyledTableCell>
                  </>
                ) : null}
                <StyledTableCell align="center">
                  <FormattedMessage id="type" defaultMessage="Type" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="length" defaultMessage="Length" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="color" defaultMessage="Color" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="quantity" defaultMessage="Quantity" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="size" defaultMessage="Size" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="start" defaultMessage="Start" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage
                    id="explanation"
                    defaultMessage="Explanation"
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <FormattedMessage id="note" defaultMessage="Note" />
                </StyledTableCell>
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
      </Paper>
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
        <p>
          <FormattedMessage id="noPdfFiles" />
        </p>
      )}

      <TableContainer component={Paper}>
        <Table className={classes.table2} aria-label="simple table">
          <TableHead>
            <TableRow
              style={{ backgroundColor: "black", borderRadius: "0.5rem" }}
            >
              <TableCell align="center" style={{ color: "white" }}>
                <FormattedMessage id="date" defaultMessage="Date" />
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <FormattedMessage id="user" defaultMessage="User" />
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <FormattedMessage id="action" defaultMessage="Action" />
              </TableCell>
              <TableCell align="center" style={{ color: "white" }}>
                <FormattedMessage id="logData" defaultMessage="Log Data" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.length > 0 ? (
              logs.reverse().map((log, i) => (
                <TableRow key={i} className={classes.tableRow}>
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
                  <TableCell align="center">{formMesFunc(log.data)}</TableCell>
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
  );
};

export default OrderDetails;
