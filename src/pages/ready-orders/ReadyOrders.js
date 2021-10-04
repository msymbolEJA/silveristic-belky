import { useEffect, useState, useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { tableColumnsReady } from "../../helper/Constants";
import { getData, putData, postFormData } from "../../helper/PostData";
import { Link } from "react-router-dom";
import moment from "moment";
import BarcodeInput from "../../components/otheritems/BarcodeInput";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Checkbox,
} from "@material-ui/core";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL_MAPPING = process.env.REACT_APP_BASE_URL_MAPPING;

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
    border: "1px solid lightgrey",
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
  inputDiv: {
    display: "flex",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#ADD8E6",
    borderRadius: "5px",
    fontSize: "1rem",
    // fontWeight: "bold",
  },
  barcodePar: {
    fontSize: "1rem",
    margin: 0,
    marginTop: 3,
    marginRight: 10,
    padding: 0,
  },
}));

const AwaitingOrders = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState(0);
  const [barcodeInput, setBarcodeInput] = useState();
  const [selected, setSelected] = useState([]);
  const barcodeInputRef = useRef();
  const [cargoForm, setCargoForm] = useState({
    tracking_number: "",
    carrier: "",
    ref_number: "",
  });

  const getOrders = () => {
    getData(`${BASE_URL}etsy/orders/?status=ready`).then((response) => {
      console.log(response.data);
      setCount(response.data.count);
      setRows(response.data.results);
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleSelectAllClick = () => {
    const tempArr = [];
    if (!selected?.length) {
      rows.forEach((row) => {
        tempArr.push(row.id);
      });
    }
    setSelected(tempArr);
  };

  const sendCargoForm = (e) => {
    e.preventDefault();
    console.log({ ...cargoForm, ids: selected });
    let urlCargo = `${BASE_URL}etsy/cargo/`;

    postFormData(urlCargo, { ...cargoForm, ids: selected })
      .then((res) => {
        // toastSuccessNotify(res.data.Success);
        // setResult(res.data.Success);
      })
      .catch(({ response }) => {
        // setResult(response.data.Failed);
        // toastErrorNotify(response.data.Failed);
      })
      .finally(() => {
        getOrders();
      });

    setCargoForm({
      tracking_number: "",
      carrier: "",
      ref_number: "",
      ids: [],
    });
  };

  const handleFormChange = (e) => {
    setCargoForm({ ...cargoForm, [e.target.name]: e.target.value });
  };

  const changeOrderStatus = (id, status) => {
    putData(`${BASE_URL_MAPPING}${id}/`, { status })
      .then((response) => {
        getOrders();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBarcodeInputKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log(barcodeInputRef.current.value);
      setBarcodeInput(barcodeInputRef.current.value);
    }
  };

  const handleCheckBoxClick = (id) => {
    let tempArr;
    if (selected.includes(id)) {
      tempArr = selected.filter((item) => id?.toString() !== item?.toString());
      setSelected(tempArr);
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleError = useCallback((err) => {
    console.error(err);
  }, []);

  const handleScan = useCallback((data) => {
    setBarcodeInput(data);
    barcodeInputRef.current.value = data;
  }, []);

  useEffect(() => {
    if (barcodeInput) checkOrderIfInProgress(barcodeInput);
    // eslint-disable-next-line
  }, [barcodeInput]);

  const checkOrderIfInProgress = async (id) => {
    let isInProgress = false;
    const url = `${BASE_URL_MAPPING}${id}/`;
    try {
      const res = await getData(url);
      isInProgress = res?.data?.status === "in_progress";
      if (isInProgress) {
        changeOrderStatus(id, "ready");
      } else {
        alert(`Urun islemde degil`);
      }
    } catch (error) {
      alert(error?.response?.data?.detail || error?.message);
    } finally {
      barcodeInputRef.current.value = null;
      setBarcodeInput(null);
    }
    return isInProgress;
  };

  return (
    <div className={classes.root}>
      <div className={classes.headerDiv}>
        <p className={classes.header}>Hazır Siparişler</p>
      </div>
      <div className={classes.headerDiv}>
        <p className={classes.found}>{count} result found!</p>
      </div>
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
                {tableColumnsReady?.map((item) =>
                  item?.objKey === "readyCargo" ? (
                    <TableCell
                      align="center"
                      className={classes.tableCellHeader}
                    >
                      Cargo
                      <Checkbox
                        indeterminate={
                          selected?.length > 0 &&
                          selected?.length < rows?.length
                        }
                        checked={
                          rows?.length > 0 && selected?.length === rows?.length
                        }
                        style={{ color: "black" }}
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                  ) : (
                    <TableCell
                      className={classes.tableCellHeader}
                      align="center"
                      key={item.id}
                    >
                      {item.name} {item?.name2 ? `/ ${item?.name2}` : null}
                    </TableCell>
                  )
                )}
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
                    {tableColumnsReady?.map((item, i) =>
                      item?.objKey === "readyCargo" ? (
                        <td
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCheckBoxClick(row?.id);
                          }}
                          onBlur={(e) => {
                            e.stopPropagation();
                          }}
                          onChange={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Checkbox
                            style={{ color: "black" }}
                            checked={selected.includes(row?.id)}
                          />
                        </td>
                      ) : (
                        <TableCell
                          key={i}
                          className={classes.tableCell}
                          align="center"
                        >
                          {item?.objKey === "creation_tsz" ? (
                            moment(row[item?.objKey]).format(
                              "MM-DD-YY HH:mm"
                            ) === "Invalid date" ? (
                              row[item?.objKey]
                            ) : (
                              moment
                                .utc(row[item?.objKey])
                                .local()
                                .format("MM-DD-YY HH:mm")
                            )
                          ) : item?.objKey === "created_date" ? (
                            moment(row[item?.objKey]).format(
                              "MM-DD-YY HH:mm"
                            ) === "Invalid date" ? (
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
                      )
                    )}
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
            value={cargoForm.ref_number}
            id="ref_number"
            name="ref_number"
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
          <h1>Kargo Tarihi</h1>
          <input
            className={classes.bottomInput}
            id="date"
            name="date"
            label="Cargo Date"
            type="date"
            variant="outlined"
            value={cargoForm.date}
            onChange={handleFormChange}
            InputLabelProps={{
              shrink: true,
            }}
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
