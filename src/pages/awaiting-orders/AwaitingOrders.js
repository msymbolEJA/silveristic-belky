import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: "50px",
    marginLeft: "10px",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    textTransform: "none",
    width: "200px",
    margin: "10px",
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
  },
  found: {
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
}));

const rows = [
  {
    receiptNumber: 132427,
    no: 2071615284,
    date: "06/02/21 08:31:39",
    adet: "1/1/1",
    systemDate: "06/02/21 08:43:00",
    buyer: "Pamela Higgins",
    supplier: "beyazit",
    type: "Kolye Tasli",
    length: "45cm",
    color: "GOLD",
    qty: "3 Tas",
    size: "-",
    start: "ortada",
    space: "-",
    explanation: "Emerald Alexandrite Emerald",
    internalNote: "",
  },
];

const AwaitingOrders = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p className={classes.header}>Bekleyen Siparişleriniz</p>
      <p className={classes.found}>{"0"} result found!</p>
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
      <div className={classes.paper}>
        <TableContainer component={Paper} className={classes.tContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.thead}>
              <TableRow>
                <TableCell>Sip.No / No</TableCell>
                <TableCell align="center">Tarih / Adet</TableCell>
                <TableCell align="center">Sistem Tarihi</TableCell>
                <TableCell align="center">Buyer</TableCell>
                <TableCell align="center">Supplier</TableCell>
                <TableCell align="center">Tip</TableCell>
                <TableCell align="center">Uzunluk</TableCell>
                <TableCell align="center">Renk</TableCell>
                <TableCell align="center">Adet</TableCell>
                <TableCell align="center">Boyut</TableCell>
                <TableCell align="center">Başlangıç</TableCell>
                <TableCell align="center">Boşluk</TableCell>
                <TableCell align="center">Açıklama</TableCell>
                <TableCell align="center">Internal Note</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.receiptNumber}>
                  <TableCell component="th" scope="row" align="center">
                    <Link to={`/order?order=${row.receiptNumber}`}>
                      {row.receiptNumber}
                    </Link>
                    <br /> {row.no}
                  </TableCell>
                  <TableCell align="center">
                    {row.date} <br /> {row.adet}
                  </TableCell>
                  <TableCell align="center">{row.systemDate}</TableCell>
                  <TableCell align="center">{row.buyer}</TableCell>
                  <TableCell align="center">{row.supplier}</TableCell>
                  <TableCell align="center">{row.type}</TableCell>
                  <TableCell align="center">{row.length}</TableCell>
                  <TableCell align="center">{row.color}</TableCell>
                  <TableCell align="center">{row.qty}</TableCell>
                  <TableCell align="center">{row.size}</TableCell>
                  <TableCell align="center">{row.start}</TableCell>
                  <TableCell align="center">{row.space}</TableCell>
                  <TableCell align="center">{row.explanation}</TableCell>
                  <TableCell align="center">{row.internalNote}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.btnGroup}>
        <Button variant="contained" className={classes.button}>
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
