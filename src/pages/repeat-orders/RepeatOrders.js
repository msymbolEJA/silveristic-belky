import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { tableColumns } from "../../helper/Constants";
import { getData } from "../../helper/PostData";
import { Link } from "react-router-dom";
import moment from "moment";
import customColors from "../../helper/Colors";

const BASE_URL = process.env.REACT_APP_BASE_URL;

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
    marginRight: "5px",
    width: "calc(100vw - 20px)",
  },
  thead: {
    backgroundColor: customColors.cornFlowerBlue,
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
    fontSize: "1.5rem",
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

const AwaitingOrders = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);

  const getOrders = () => {
    // getData(`${BASE_URL}etsy/orders/?status=repeat`).then((response) => {
    getData(`${BASE_URL}etsy/orders/?is_repeat=true&ordering=-id`).then(
      (response) => {
        console.log(response.data);
        setCount(response.data.count);
        setRows(response.data.results);
      }
    );
  };

  useEffect(() => {
    getOrders();
  }, []);

  // http://185.15.198.109:8080/etsy/orders/?status=pending

  return (
    <div className={classes.root}>
      <div className={classes.headerDiv}>
        <p className={classes.header}>Bekleyen Siparişleriniz</p>
      </div>
      <div className={classes.headerDiv}>
        <p className={classes.found}>{count} result found!</p>
      </div>
      {rows?.length > 0 ? (
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
                {rows?.map((row, index) => (
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}
    </div>
  );
};

export default AwaitingOrders;
