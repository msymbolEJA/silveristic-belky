import React, { useCallback } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { editableMappingTableColumns } from "../../helper/Constants";
import { putData } from "../../helper/PostData";
import EditableTableCell from "../newitems/EditableCell";
import { Link } from "react-router-dom";

const BASE_URL_MAPPING = process.env.REACT_APP_BASE_URL_MAPPING;

const useStyles = makeStyles(() => ({
  paper: {
    border: "1px solid lightgrey",
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

const CustomTable = ({ rows, handleSearch, searchType }) => {
  const classes = useStyles();

  const onChange = (e, id, name) => {
    if (!rows.length || !name || !e?.target?.innerText) return;
    if (
      rows?.filter((item) => item.id === name)?.[0]?.[name] ===
      e.target.innerText
    )
      return;
    handleRowChange(id, { [name]: e.target.innerText });
    handleSearch("", searchType);
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
          handleSearch("", searchType);
        });
    },
    [rows, handleSearch, searchType]
  );

  // console.log(location.search);

  const handleOptionChange = (e, id) => {
    handleRowChange(id, { [e.target.name]: e.target.value });
  };

  const handleReady = (e, id) => {
    handleRowChange(id, { [e.target.name]: e.target.checked });
  };

  return (
    <div className={classes.paper}>
      <TableContainer className={classes.tContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.thead}>
            <TableRow>
              {editableMappingTableColumns?.map((item) => (
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
                  {editableMappingTableColumns?.map((item, i) => (
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
                          <option value="">all</option>
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
                          onChange={(e) => handleOptionChange(e, row.id)}
                        >
                          <option value="all">all</option>
                          <option value="asya">asya</option>
                          <option value="beyazit">beyazit</option>
                          <option value="stok">stok</option>
                        </select>
                      ) : item?.objKey === "type" ||
                        item?.objKey === "length" ||
                        item?.objKey === "color" ||
                        item?.objKey === "qty" ||
                        item?.objKey === "size" ||
                        item?.objKey === "start" ||
                        item?.objKey === "explanation" ||
                        item?.objKey === "space" ||
                        item?.objKey === "note" ? (
                        <EditableTableCell
                          {...{
                            row,
                            name: item?.objKey,
                            onChange,
                          }}
                        />
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;
