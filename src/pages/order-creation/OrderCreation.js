import React, { useCallback, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { newOrderColumns } from "../../helper/Constants";
import Button from "@material-ui/core/Button";
import { postFormData } from "../../helper/PostData";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    width: "1100px",
  },
  tContainer: {},
  table: {},
  tableCellHeader: {
    fontFamily: "Courier New",
    fontWeight: "bold",
    border: "1px solid #DEE2E6",
  },
  tableCell: {
    fontFamily: "Courier New",
    border: "1px solid #DEE2E6",
  },
  thead: {
    backgroundColor: "#6495ED",
  },
  input: {
    width: "100%",
    height: "35px",
    border: "1px solid #DEE2E6",
    borderRadius: "5px",
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
  select: {
    width: "fit-content",
    height: "40px",
    display: "block",
    // margin: 5,
    border: "1px solid #DEE2E6",
    borderRadius: "5px",
    padding: "5px",
    borderRadius: "5px",
    "&:focus": {
      outline: "none !important",
      boxShadow: "0 0 10px #0069D9",
    },
  },
}));

const initialValues = {
  customer: "",
  supplier: "asya",
  type: "",
  length: "",
  color: "",
  qty: "",
  size: "",
  start: "",
  space: "",
  explanation: "",
};

const CustomTable = () => {
  const classes = useStyles();
  const [info, setInfo] = useState(initialValues);

  const handleContentChange = useCallback(
    (e, name) => {
      setInfo({ ...info, [name]: e.target.value });
    },
    [info]
  );

  const createNewOrder = () => {
    console.log(info);
    postFormData(`${BASE_URL}etsy/manuel_orders/`, info)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <h1>New Order Creation</h1>
        <h3>Please fill all the fields</h3>
        <TableContainer className={classes.tContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.thead}>
              <TableRow>
                {newOrderColumns?.map((item) => (
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
              <TableRow>
                {newOrderColumns?.map((item, i) => (
                  <TableCell
                    key={i}
                    className={classes.tableCell}
                    align="center"
                  >
                    {item?.objKey === "supplier" ? (
                      <select
                        name="supplier"
                        id="supplier"
                        className={classes.select}
                        defaultValue={"asya"}
                        onChange={(e) => handleContentChange(e, "supplier")}
                      >
                        <option value="asya">asya</option>
                        <option value="beyazit">beyazit</option>
                        <option value="stok">stok</option>
                      </select>
                    ) : (
                      <input
                        className={classes.input}
                        onChange={(e) => handleContentChange(e, item?.objKey)} // handle innerHTML change
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div>
          <Button
            variant="contained"
            className={classes.printBtn}
            onClick={createNewOrder}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomTable;
