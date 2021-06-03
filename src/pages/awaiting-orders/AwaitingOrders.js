import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { tableColumns } from "../../helper/Constants";
import { getData } from "../../helper/PostData";

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
    width: "calc(100% - 20px)",
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
}));

const AwaitingOrders = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getData(`${BASE_URL}etsy/orders/?status=pending&limit=25&offset=0`).then(
      (response) => {
        console.log(response.data.results);
        setRows(response.data.results);
      }
    );
  }, []);

  // http://185.15.198.109:8080/etsy/orders/?status=pending

  return (
    <div className={classes.root}>
      <div className={classes.headerDiv}>
        <p className={classes.header}>Bekleyen Siparişleriniz</p>
      </div>
      <div className={classes.headerDiv}>
        <p className={classes.found}>{"0"} result found!</p>
      </div>
      <div className={classes.headerDiv}>
        <div className={classes.btnGroup}>
          <Button variant="contained" className={classes.button}>
            All
          </Button>
          <Button variant="contained" className={classes.button}>
            USA
          </Button>
          <Button variant="contained" className={classes.button}>
            International
          </Button>
        </div>
      </div>
      <div className={classes.paper}>
        <TableContainer component={Paper} className={classes.tContainer}>
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
                        {row[item?.objKey]}
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
      <div>
        <Button variant="contained" className={classes.printBtn}>
          Yazdır
        </Button>
      </div>
      <div className={classes.labels}>
        <h2>Eski Labellar</h2>
        <a
          href="http://45.76.235.108/static/pdf/bulk/admin/05_19_2021-15_24.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          admin/05_19_2021-15_24.pdf
        </a>
        <a
          href="http://45.76.235.108/static/pdf/bulk/admin/05_19_2021-15_24.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          admin/05_19_2021-15_24.pdf
        </a>
        <a
          href="http://45.76.235.108/static/pdf/bulk/admin/05_19_2021-15_24.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          admin/05_19_2021-15_24.pdf
        </a>
      </div>
    </div>
  );
};

export default AwaitingOrders;
