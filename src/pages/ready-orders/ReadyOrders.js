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

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles(() => ({
  root: {
    // marginTop: "50px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
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
    border: "2px solid #F2F2F2",
    backgroundColor: "#FFF",
    borderRadius: "5px",
    marginBottom: "25px",
  },
  hrStyle: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  bottomInput: {
    padding: 15,
    width: "calc(100vw - 100px)",
    border: "1px solid #DEE2E6",
    borderRadius: "5px",
  },
  button: {
    color: "#17A2B8",
    textTransform: "none",
    border: "1px solid #17A2B8",
    // marginRight: "5px",
    width: "fit-content",
    paddingTop: "3px",
    paddingBottom: "3px",
    fontSize: "0.9rem",
    paddingRight: "12px",
    paddingLeft: "12px",
    cursor: "pointer",
    backgroundColor: "#fff",
    borderRadius: "3px",
    "&:hover": {
      backgroundColor: "#17A2B8",
      color: "white",
    },
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    marginTop: "20px",
  },
}));

const AwaitingOrders = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  const [cargoForm, setCargoForm] = useState({
    tracking_number: "",
    carrier: "",
    ref_number_f: "",
  });

  const getOrders = () => {
    getData(`${BASE_URL}etsy/orders/?status=ready&limit=25&offset=0`).then(
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

  const sendCargoForm = (e) => {
    e.preventDefault();
    console.log(cargoForm);
    // let urlCargo = `${BASE_URL}etsy/cargo/`;

    // postFormData(urlCargo, cargoForm)
    //   .then((res) => {
    //     // toastSuccessNotify(res.data.Success);
    //     // setResult(res.data.Success);
    //   })
    //   .catch(({ response }) => {
    //     // setResult(response.data.Failed);
    //     // toastErrorNotify(response.data.Failed);
    //   })

    setCargoForm({
      tracking_number: "",
      carrier: "",
      ref_number_f: "",
    });
    try {
      getOrders();
    } catch (error) {
      //console.log(error);
    }
  };

  const handleFormChange = (e) => {
    setCargoForm({ ...cargoForm, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.root}>
      <div className={classes.headerDiv}>
        <p className={classes.header}>Hazır Siparişler</p>
      </div>
      <div className={classes.headerDiv}>
        <p className={classes.found}>{count} result found!</p>
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

      <div className={classes.paper}>
        <h3>Gönderi Oluşturma</h3>
        <hr className={classes.hrStyle} />
        <form onSubmit={sendCargoForm}>
          <h4>Referans Numarası</h4>
          <input
            className={classes.bottomInput}
            value={cargoForm.ref_number_f}
            id="ref_number_f"
            name="ref_number_f"
            onChange={handleFormChange}
          />
          <h1>Kargo Firması</h1>
          <input
            className={classes.bottomInput}
            value={cargoForm.carrier}
            id="carrier"
            name="carrier"
            onChange={handleFormChange}
          />
          <h1>Takip Kodu</h1>
          <input
            className={classes.bottomInput}
            value={cargoForm.tracking_number}
            id="tracking_number"
            name="tracking_number"
            onChange={handleFormChange}
          />
          <div className={classes.buttonDiv}>
            <button className={classes.button} type="submit">
              Paketlemek Istediginize Emin Misiniz ??
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AwaitingOrders;
