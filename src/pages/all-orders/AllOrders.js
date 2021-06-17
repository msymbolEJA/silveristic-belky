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
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles(() => ({
  root: {
    // marginTop: "50px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    color: "#17A2B8",
    textTransform: "none",
    border: "1px solid #17A2B8",
    // marginRight: "5px",
    width: "fit-content",
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingRight: "12px",
    paddingLeft: "12px",
    cursor: "pointer",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#17A2B8",
      color: "white",
    },
  },
  activeBtn: {
    color: "black",
    textTransform: "none",
    border: "1px solid #17A2B8",
    // marginRight: "5px",
    width: "fit-content",
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingRight: "12px",
    paddingLeft: "12px",
    cursor: "pointer",
    borderRadius: "5px",
    backgroundColor: "#17A2B8",
    "&:hover": {
      backgroundColor: "#138496",
    },
  },
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
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

const AwaitingOrders = (props) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(props.match.params.page);
  const [count, setCount] = useState(0);
  const history = useHistory();

  console.log(props.match.params.page);

  useEffect(() => {
    const pageOrders = page * 100;
    // const startOrders =
    getData(
      `${BASE_URL}etsy/orders/?status=&limit=100&offset=${(page - 1) * 100}`
    ).then((response) => {
      console.log(response.data.count / 100);
      console.log(Math.ceil(response.data.count / 100));
      setCount(response.data.count);
      setRows(response.data.results);
    });
  }, [page]);

  const handlePageChange = (page) => {
    history.push(`/orders/page/${page}`);
    setPage(page);
  };

  return (
    <div className={classes.root}>
      <div className={classes.btnGroup}>
        {page > 1 ? (
          <div
            className={classes.button}
            onClick={() => handlePageChange(Number(page) - 1)}
          >
            Önceki
          </div>
        ) : null}
        {page > 5 ? (
          <>
            <div className={classes.button} onClick={() => handlePageChange(1)}>
              {1}
            </div>
            <div className={classes.button} onClick={() => handlePageChange(2)}>
              {2}
            </div>
            ...
            <div
              className={classes.button}
              onClick={() => handlePageChange(Number(page) - 2)}
            >
              {Number(page) - 2}
            </div>
            <div
              className={classes.button}
              onClick={() => handlePageChange(Number(page) - 1)}
            >
              {Number(page) - 1}
            </div>
          </>
        ) : page > 4 ? (
          <>
            <div className={classes.button} onClick={() => handlePageChange(1)}>
              {1}
            </div>
            <div className={classes.button} onClick={() => handlePageChange(2)}>
              {2}
            </div>
            <div className={classes.button} onClick={() => handlePageChange(3)}>
              {3}
            </div>
            <div className={classes.button} onClick={() => handlePageChange(4)}>
              {4}
            </div>
          </>
        ) : page > 3 ? (
          <>
            <div className={classes.button} onClick={() => handlePageChange(1)}>
              {1}
            </div>
            <div className={classes.button} onClick={() => handlePageChange(2)}>
              {2}
            </div>
            <div className={classes.button} onClick={() => handlePageChange(3)}>
              {3}
            </div>
          </>
        ) : page > 2 ? (
          <>
            <div className={classes.button} onClick={() => handlePageChange(1)}>
              {1}
            </div>
            <div className={classes.button} onClick={() => handlePageChange(2)}>
              {2}
            </div>
          </>
        ) : page > 1 ? (
          <>
            <div className={classes.button} onClick={() => handlePageChange(1)}>
              {1}
            </div>
          </>
        ) : null}
        {page < Math.ceil(count / 100) - 4 ? (
          <>
            <div
              className={classes.activeBtn}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </div>
            <div
              className={classes.button}
              onClick={() => handlePageChange(Number(page) + 1)}
            >
              {Number(page) + 1}
            </div>
            <div
              className={classes.button}
              onClick={() => handlePageChange(Number(page) + 2)}
            >
              {Number(page) + 2}
            </div>
            ...
          </>
        ) : page < Math.ceil(count / 100) - 3 ? (
          <>
            <div
              className={classes.activeBtn}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </div>
            <div
              className={classes.button}
              onClick={() => handlePageChange(Number(page) + 1)}
            >
              {Number(page) + 1}
            </div>
            <div
              className={classes.button}
              onClick={() => handlePageChange(Number(page) + 2)}
            >
              {Number(page) + 2}
            </div>
          </>
        ) : page < Math.ceil(count / 100) - 2 ? (
          <>
            <div
              className={classes.activeBtn}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </div>
            <div
              className={classes.button}
              onClick={() => handlePageChange(Number(page) + 1)}
            >
              {Number(page) + 1}
            </div>
          </>
        ) : page < Math.ceil(count / 100) - 1 ? (
          <>
            <div
              className={classes.activeBtn}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </div>
          </>
        ) : null}
        <div
          className={
            page === Math.ceil(count / 100) - 1
              ? classes.activeBtn
              : classes.button
          }
          onClick={() => handlePageChange(Math.ceil(count / 100) - 1)}
        >
          {Math.ceil(count / 100) - 1}
        </div>
        <div
          className={
            page === Math.ceil(count / 100) ? classes.activeBtn : classes.button
          }
          onClick={() => handlePageChange(Math.ceil(count / 100))}
        >
          {Math.ceil(count / 100)}
        </div>
        {page !== Math.ceil(count / 100) ? (
          <div className={classes.button}>Sonraki</div>
        ) : null}
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
                        {item?.name === "Sip.No" ? (
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

export default AwaitingOrders;
