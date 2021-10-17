import React, { useCallback, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {
  editableMappingTableColumns,
  repeatReasons,
} from "../../helper/Constants";
import { putData } from "../../helper/PostData";
import EditableTableCell from "../newitems/EditableCell";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Flag as FlagIcon, Repeat as RepeatIcon } from "@material-ui/icons";
import customColors from "../../helper/Colors";

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
    padding: 0,
    margin: 0,
  },
  darkTableRow: {
    backgroundColor: "#F2F2F2",
  },
  thead: {
    backgroundColor: customColors.cornFlowerBlue,
  },
  checkbox: {
    padding: 10,
    cursor: "pointer",
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

const CustomTable = ({ rows, handleSearch, searchType }) => {
  const classes = useStyles();
  const [repeatAnchorEl, setRepeatAnchorEl] = useState();
  const [repeatMenuData, setRepeatMenuData] = useState({});
  const [rowIdToRepeat, setRowIdToRepeat] = useState();

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

  // console.log(location.search);

  const handleOptionChange = (e, id) => {
    handleRowChange(id, { [e.target.name]: e.target.value });
  };

  const handleReady = (e, id) => {
    handleRowChange(id, { [e.target.name]: e.target.checked });
    if (e.target.checked) handleRowChange(id, { status: "awaiting" });
  };

  const handlerRepeatChange = (e, id, is_repeat) => {
    if (is_repeat) {
      let data = { is_repeat: false };
      handleRowChange(id, data);
    } else {
      setRowIdToRepeat(id);
      setRepeatAnchorEl(e.currentTarget);
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
                          {Boolean(repeatAnchorEl) && row.id === rowIdToRepeat
                            ? repeatMenu(row)
                            : null}
                          <select
                            name="status"
                            id="status"
                            className={classes.select}
                            value={row[item?.objKey]}
                            onChange={(e) => handleOptionChange(e, row.id)}
                          >
                            {/* <option value="">all</option> */}
                            <option value="awaiting">awaiting</option>
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
                          <option value="all">all</option>
                          <option value="asya">asya</option>
                          <option value="beyazit">beyazit</option>
                          {/* <option value="stok">stok</option> */}
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
