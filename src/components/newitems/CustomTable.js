import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import { tableColumns } from "../../helper/Constants";

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
}));

const CustomTable = ({ rows }) => {
  const classes = useStyles();

  return (
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
  );
};

export default CustomTable;
