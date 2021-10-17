import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { logTableColumns } from "../../helper/Constants";
import moment from "moment";
import customColors from "../../helper/Colors";

const useStyles = makeStyles(() => ({
  tContainer: {
    marginRight: "5px",
    width: "calc(100vw - 20px)",
  },
  thead: {
    backgroundColor: customColors.cornFlowerBlue,
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
    marginTop: "10px",
  },
}));

const LogDetails = ({ logData }) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <TableContainer className={classes.tContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.thead}>
            <TableRow>
              {logTableColumns?.map((item) => (
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
            {logData?.map((row, index) => (
              <TableRow
                key={row?.id}
                className={index % 2 === 1 ? classes.darkTableRow : null}
              >
                {logTableColumns?.map((item, i) => (
                  <TableCell
                    key={i}
                    className={classes.tableCell}
                    align="center"
                  >
                    {item?.objKey === "change_date"
                      ? moment(row[item?.objKey]).format("MM-DD-YY HH:mm") ===
                        "Invalid date"
                        ? row[item?.objKey]
                        : moment
                            .utc(row[item?.objKey])
                            .local()
                            .format("MM-DD-YY HH:mm")
                      : row[item?.objKey]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default LogDetails;
