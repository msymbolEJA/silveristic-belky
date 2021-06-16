import { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { editableTableColumns } from "../../helper/Constants";
import { getData, putData } from "../../helper/PostData";
import moment from "moment";
import EditableCell from "../../components/newitems/EditableCell";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL_MAPPING = process.env.REACT_APP_BASE_URL_MAPPING;

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
    getData(`${BASE_URL}etsy/orders/?status=pending&limit=25&offset=0`).then(
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

  const onChange = (e, id, name) => {
    if (!rows.length || !name || !e?.target?.innerText) return;
    if (
      rows?.filter((item) => item.id === name)?.[0]?.[name] ===
      e.target.innerText
    )
      return;
    handleRowChange(id, { [name]: e.target.innerText });
  };

  const handleRowChange = useCallback(
    (id, data) => {
      if (!data) return;
      if (
        rows?.filter((item) => item.id === id)?.[0]?.[Object.keys(data)[0]] ===
        Object.values(data)[0]
      )
        return;
      putData(`${BASE_URL_MAPPING}${id}/`, data)
        .then((response) => {
          // console.log("THEN", response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          getOrders();
        });
    },
    [rows]
  );

  const handleOptionChange = (e, id) => {
    handleRowChange(id, { [e.target.name]: e.target.value });
  };

  const handleReady = (e, id) => {
    handleRowChange(id, { [e.target.name]: e.target.checked });
  };
  return (
    <div className={classes.root}>
      <div className={classes.headerDiv}>
        <p className={classes.header}>Order Preparation</p>
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
                  {editableTableColumns?.map((item) => (
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
                    {editableTableColumns?.map((item, i) => (
                      <TableCell
                        key={i}
                        className={classes.tableCell}
                        align="center"
                      >
                        {item?.objKey === "approved" ? (
                          <label className="container">
                            <input
                              type="checkbox"
                              className={classes.checkbox}
                              defaultChecked={row[item?.objKey]}
                              onClick={(e) => handleReady(e, row.id)}
                              name="approved"
                            />
                          </label>
                        ) : item?.objKey === "personalization" &&
                          (row[item?.objKey] === null ||
                            row[item?.objKey] === "") ? (
                          "None"
                        ) : item?.objKey === "status" ? (
                          <select
                            name="status"
                            id="status"
                            className={classes.select}
                            value={row[item?.objKey]}
                            onChange={(e) => handleOptionChange(e, row.id)}
                          >
                            <option value="awaiting">awaiting</option>
                            <option value="pending">pending</option>
                            <option value="in_progress">processing</option>
                            <option value="ready">ready</option>
                            <option value="in_transit">in_transit</option>
                            <option value="repeat">repeat</option>
                            <option value="shipped">shipped</option>
                            <option value="cancelled">cancelled</option>
                            <option value="follow_up">follow_up</option>
                          </select>
                        ) : item?.objKey === "supplier" ? (
                          <select
                            name="supplier"
                            id="supplier"
                            className={classes.select}
                            value={row[item?.objKey]}
                            onChange={(e) => handleOptionChange(e, row.id)}
                          >
                            <option value="asya">asya</option>
                            <option value="beyazit">beyazit</option>
                            <option value="stok">stok</option>
                          </select>
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
                        ) : item?.objKey === "type" ||
                          item?.objKey === "length" ||
                          item?.objKey === "color" ||
                          item?.objKey === "qty" ||
                          item?.objKey === "size" ||
                          item?.objKey === "start" ||
                          item?.objKey === "explanation" ||
                          item?.objKey === "space" ||
                          item?.objKey === "note" ? (
                          <EditableCell
                            {...{
                              row,
                              name: item?.objKey,
                              onChange,
                            }}
                          />
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
