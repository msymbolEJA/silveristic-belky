import { useEffect, useState, useCallback } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import { editableTableColumns, repeatReasons } from "../../helper/Constants";
import { getData, putData } from "../../helper/PostData";
import moment from "moment";
import EditableCell from "../../components/newitems/EditableCell";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { toastWarnNotify } from "../../components/otheritems/ToastNotify";
import { postData } from "../../helper/PostData";
import {
  Flag as FlagIcon,
  Repeat as RepeatIcon,
  // ThumbUpAlt as ThumbUpAltIcon,
} from "@material-ui/icons";
import customColors from "../../helper/Colors";

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
    backgroundColor: customColors.cornFlowerBlue,
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
    padding: 0,
    margin: 0,
  },
  darkTableRow: {
    backgroundColor: "#F2F2F2",
  },
  paper: {
    border: "1px solid lightgrey",
    borderRadius: "5px",
  },
  select: {
    height: "46px",
    margin: "0 5px",
    borderRadius: "5px",
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const AwaitingOrders = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState();
  const [selected, setSelected] = useState([]);
  const [rowIdToRepeat, setRowIdToRepeat] = useState();
  const [repeatAnchorEl, setRepeatAnchorEl] = useState();
  const [repeatMenuData, setRepeatMenuData] = useState({});

  const getOrders = () => {
    getData(
      // `${BASE_URL}etsy/orders/?status=pending&limit=2500&offset=0&ordering=-id`
      `${BASE_URL}etsy/orders/?status=pending&limit=25&offset=0&ordering=-id`
    ).then((response) => {
      console.log(response.data);
      setCount(response.data.count);
      setRows(response.data.results);
    });
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

  const handleRepeatMenuItemClick = useCallback(
    (row, reason) => () => {
      const data = {
        rowId: row.id,
        is_repeat: true,
        approved: true,
        status: "awaiting",
        explanation: "**REPEAT: " + reason + "** " + row?.explanation,
      };
      setRepeatMenuData(data);
    },
    []
  );

  const handlerRepeatChange = (e, id, is_repeat) => {
    if (is_repeat) {
      let data = { is_repeat: false };
      handleRowChange(id, data);
    } else {
      setRowIdToRepeat(id);
      setRepeatAnchorEl(e.currentTarget);
    }
  };

  const handleRepeatMenuClose = useCallback(() => {
    setRepeatAnchorEl(null);
    setRepeatMenuData({});
  }, []);

  const handleRepeatMenuConfirm = useCallback(() => {
    if (repeatMenuData.rowId) {
      handleRowChange(repeatMenuData.rowId, repeatMenuData);
    }
    handleRepeatMenuClose();
  }, [handleRowChange, repeatMenuData, handleRepeatMenuClose]);

  const handleApproveSelected = () => {
    postData(`${BASE_URL}etsy/approved_all/`, { ids: selected })
      .then((res) => {
        // toastWarnNotify("Selected 'PENDING' orders are approved");
        getOrders();
        setSelected([]);
      })
      .catch(({ response }) => {
        toastWarnNotify(response?.data?.detail);
      });
  };

  const handleCheckBoxClick = (event, id, row) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (!(!!row.supplier && !!row.type && !!row.color && !!row.length)) return;
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows?.map((row) => {
        if (!(!!row.supplier && !!row.type && !!row.color && !!row.length))
          return null;
        return row?.id;
      });
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleOptionChange = (e, id) => {
    handleRowChange(id, { [e.target.name]: e.target.value });
  };

  const handleReady = (e, id) => {
    handleRowChange(id, { [e.target.name]: e.target.checked });
  };

  const handlerFlagRepeatChange = (id, name, value) => {
    if (name === "is_repeat" && value === false) {
      let data = { [name]: !value, status: "awaiting" };
      handleRowChange(id, data);
    } else if (name === "approved" && value === false) {
      let data = { [name]: !value, status: "awaiting" };
      handleRowChange(id, data);
    } else {
      let data = { [name]: !value };
      handleRowChange(id, data);
    }
  };

  const repeatMenu = useCallback(
    (row) => {
      return (
        <>
          <StyledMenu
            id="customized-menu"
            anchorEl={repeatAnchorEl}
            keepMounted
            open={Boolean(repeatAnchorEl)}
            onClose={handleRepeatMenuClose}
          >
            <hr />
            <StyledMenuItem>
              <ListItemText
                primary="Wrong manufacturing"
                id="Wrong manufacturing"
                onClick={handleRepeatMenuItemClick(
                  row,
                  repeatReasons.MANUFACTURING_ERROR
                )}
              />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemText
                primary="Discoloration"
                id="discoloration"
                onClick={handleRepeatMenuItemClick(
                  row,
                  repeatReasons.DISCOLORATION
                )}
              />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemText
                primary="Break off"
                id="break off"
                onClick={handleRepeatMenuItemClick(
                  row,
                  repeatReasons.BREAK_OFF
                )}
              />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemText
                primary="Lost in mail"
                id="lost in mail"
                onClick={handleRepeatMenuItemClick(
                  row,
                  repeatReasons.LOST_IN_MAIL
                )}
              />
            </StyledMenuItem>
            <StyledMenuItem>
              <ListItemText
                primary="Second"
                id="Second"
                onClick={handleRepeatMenuItemClick(row, repeatReasons.SECOND)}
              />
            </StyledMenuItem>
            <StyledMenuItem style={{ justifyContent: "space-around" }}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleRepeatMenuClose}
              >
                Cancel
              </Button>
              <Button
                color="secondary"
                variant="contained"
                onClick={handleRepeatMenuConfirm}
              >
                OK
              </Button>
            </StyledMenuItem>
          </StyledMenu>
        </>
      );
    },
    [
      handleRepeatMenuClose,
      handleRepeatMenuConfirm,
      handleRepeatMenuItemClick,
      repeatAnchorEl,
    ]
  );

  return (
    <div className={classes.root}>
      <div className={classes.headerDiv}>
        <p className={classes.header}>Order Preparation</p>
      </div>
      <div className={classes.headerDiv}>
        {count ? (
          <p className={classes.found}>{count} result found!</p>
        ) : count === 0 ? (
          <p className={classes.found}>{count} result found!</p>
        ) : null}
      </div>
      {rows?.length > 0 ? (
        <div className={classes.paper}>
          <TableContainer className={classes.tContainer}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.thead}>
                <TableRow>
                  {editableTableColumns?.map((item) =>
                    item?.objKey === "approved" ? (
                      <TableCell
                        align="center"
                        style={{
                          padding: 0,
                          borderRight: "0.5px solid #E0E0E0",
                        }}
                      >
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={handleApproveSelected}
                          className={classes.approveButton}
                          disabled={!selected?.length}
                        >
                          Approve (
                          {
                            selected.filter(function (el) {
                              return el != null;
                            })?.length
                          }
                          )
                        </Button>
                        <br />
                        <Checkbox
                          indeterminate={
                            selected?.length > 0 &&
                            selected?.length < rows?.length
                          }
                          checked={
                            rows?.length > 0 &&
                            selected?.length === rows?.length
                          }
                          color="primary"
                          onChange={handleSelectAllClick}
                          inputProps={{ "aria-label": "select all" }}
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
                {rows?.map((row, index) => {
                  console.log(
                    "🚀 ~ file: OrderPreparation.js ~ line 282 ~ {rows?.map ~ row",
                    row
                  );
                  const isItemSelected = selected.indexOf(row.id) !== -1;
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
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
                            <div
                              style={{
                                padding: 0,
                                pointerEvents:
                                  row.status === "pending" ? "auto" : "none",
                                display: "block",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCheckBoxClick(e, row.id, row);
                              }}
                              onBlur={(e) => {
                                e.stopPropagation();
                              }}
                              onChange={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <label className="container">
                                <Checkbox
                                  checked={isItemSelected}
                                  disabled={
                                    !(
                                      !!row.supplier &&
                                      !!row.type &&
                                      !!row.color &&
                                      !!row.length
                                    )
                                  }
                                  color="primary"
                                  inputProps={{ "aria-labelledby": labelId }}
                                />
                              </label>
                            </div>
                          ) : item?.objKey === "personalization" &&
                            (row[item?.objKey] === null ||
                              row[item?.objKey] === "") ? (
                            "None"
                          ) : item?.objKey === "status" ? (
                            <div>
                              <FlagIcon
                                style={{
                                  color: row["is_followup"] ? "red" : "grey",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  handlerFlagRepeatChange(
                                    row.id,
                                    "is_followup",
                                    row["is_followup"]
                                  )
                                }
                              />
                              <RepeatIcon
                                style={{
                                  color: row["is_repeat"] ? "red" : "grey",
                                  cursor: "pointer",
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlerRepeatChange(e, row.id, row.is_repeat);
                                }}
                              />
                              {Boolean(repeatAnchorEl) &&
                              row.id === rowIdToRepeat
                                ? repeatMenu(row)
                                : null}
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
                                {/* <option value="repeat">repeat</option> */}
                                <option value="shipped">shipped</option>
                                <option value="cancelled">cancelled</option>
                                {/* <option value="follow_up">follow_up</option> */}
                              </select>
                            </div>
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
                              {/* <option value="stok">stok</option> */}
                            </select>
                          ) : item?.objKey === "created_date" ? (
                            moment(row[item?.objKey]).format(
                              "MM-DD-YY HH:mm"
                            ) === "Invalid date" ? (
                              row[item?.objKey]
                            ) : (
                              <>
                                {moment
                                  .utc(row[item?.objKey])
                                  .local()
                                  .format("MM-DD-YY")}
                                <br />
                                {moment
                                  .utc(row[item?.objKey])
                                  .local()
                                  .format("HH:mm")}
                              </>
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
                          ) : item?.name === "No" ? (
                            <Link to={`/orders/${row[item?.objKey]}`}>
                              {row[item?.objKey]}
                            </Link>
                          ) : (
                            row[item?.objKey]
                          )}
                          {item?.objKey2 ? (
                            <div>{row[item?.objKey2]}</div>
                          ) : null}
                          {item?.objKey3 ? (
                            <div>{row[item?.objKey3]}</div>
                          ) : null}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : null}
    </div>
  );
};

export default AwaitingOrders;
