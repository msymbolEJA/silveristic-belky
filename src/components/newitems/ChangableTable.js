import React, { useCallback } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { editableTableColumns } from "../../helper/Constants";
import { putData } from "../../helper/PostData";
import { useLocation } from "react-router-dom";

const BASE_URL_MAPPING = process.env.REACT_APP_BASE_URL_MAPPING;

const useStyles = makeStyles(() => ({
  paper: {
    border: "2px solid #F2F2F2",
    borderRadius: "5px",
  },
  tContainer: {
    marginRight: "5px",
    width: "calc(100vw - 20px)",
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
  thead: {
    backgroundColor: "#6495ED",
  },
  checkbox: {
    padding: 10,
    cursor: "pointer",
  },
}));

const CustomTable = ({ rows, searchInfo, getSearchInfo, valueSearchInfo }) => {
  const classes = useStyles();
  let location = useLocation();

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
          console.log("THEN", response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          console.log(searchInfo);
          console.log(valueSearchInfo);
          getSearchInfo(searchInfo, "direct");
        });
    },
    [rows]
  );

  console.log(location.search);

  const handleOptionChange = (e, id) => {
    console.log(id, e.target.name, e.target.value);
    // setSearchInfo({ ...searchInfo, [e.target.name]: e.target.value });
    // console.log(searchInfo);

    handleRowChange(id, { [e.target.name]: e.target.value });
  };

  return (
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
                          />
                        </label>
                      ) : item?.objKey === "personalization" &&
                        row[item?.objKey] === null ? (
                        "None"
                      ) : item?.objKey === "status" ? (
                        <select
                          name="status"
                          id="status"
                          className={classes.select}
                          value={row[item?.objKey]}
                          onChange={(e) => handleOptionChange(e, row.id)}
                        >
                          <option value="all">all</option>
                          <option value="awaiting">awaiting</option>
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
                          onChange={(e) => handleOptionChange(e)}
                        >
                          <option value="all">all</option>
                          <option value="asya">asya</option>
                          <option value="beyazit">beyazit</option>
                          <option value="stok">stok</option>
                        </select>
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
  );
};

export default CustomTable;
