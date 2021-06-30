import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { NavbarOptions } from "../..//helper/Constants";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const STORE_NAME = process.env.REACT_APP_STORE_NAME;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50,
  },
  leftPart: {
    marginRight: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  storeName: {
    fontSize: "1.25rem",
    cursor: "pointer",
    marginRight: "1rem",
  },
  toolbar: {
    backgroundColor: STORE_NAME === "Hilal Serisi" ? "#BA000D" : "#5F788A",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 55,
  },
  rightPart: {
    display: "flex",
    cursor: "pointer",
    "& p": {
      margin: "5px",
      color: "lightgrey",
    },
  },
  menuBtn: {
    color: "#CBD5DB",
    textTransform: "none",
    fontWeight: "bold",
  },
  menu: {
    marginTop: "2rem",
  },
  menuDiv: {
    display: "flex",
  },
  menuItem: {
    width: "150px",
  },
}));

export default function MenuAppBar() {
  const classes = useStyles(); // eslint-disable-next-line
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState({
    orders: null,
    administration: null,
    follow: null,
  });

  const handleClick = (event, name) => {
    setAnchorEl({ ...anchorEl, [name]: event.currentTarget });
  };

  const handleClose = (e, name) => {
    setAnchorEl({ ...anchorEl, [name]: false });
  };
  const handleMenuClick = (e, name, url) => {
    e.stopPropagation();
    if (url) {
      history.push(`/${url}`);
    }
    setAnchorEl(null);
  };

  const handleAccountPage = () => {
    history.push("/account");
  };

  let localRole = localStorage.getItem("localRole");

  const handleMainPage = () => {
    if (localRole === "workshop_designer") {
      return null;
    } else {
      history.push("/");
    }
  };

  const handleLogout = () => {
    history.push("/");
    localStorage.removeItem("x-auth-token");
    localStorage.removeItem("localUser");
    localStorage.removeItem("localEmail");
    localStorage.removeItem("localRole");
    localStorage.removeItem("localId");
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar
          className={classes.toolbar}
          variant="dense"
          style={{ height: "50px" }}
        >
          <div className={classes.leftPart}>
            <h1 className={classes.storeName} onClick={handleMainPage}>
              {STORE_NAME.toUpperCase()}
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {NavbarOptions?.map((item, index) => (
                <div key={index} className={classes.menuDiv}>
                  {item.name === "administration" ? (
                    localRole === "admin" ? (
                      <>
                        <Button
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={(e) => handleClick(e, item.name)}
                          className={classes.menuBtn}
                        >
                          {item.label}
                          <ArrowDropDownIcon
                            color="disabled"
                            style={{ color: "#CBD5DB" }}
                          />
                        </Button>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl ? anchorEl[item?.name] : null}
                          keepMounted
                          open={Boolean(anchorEl ? anchorEl[item?.name] : null)}
                          onClose={(e) => handleClose(e, item?.name)}
                          className={classes.menu}
                        >
                          {item?.options.map((item, index) => (
                            <MenuItem
                              onClick={(e) =>
                                handleMenuClick(e, item.name, item.url)
                              }
                              key={index}
                              className={classes.menuItem}
                            >
                              {item.order}
                            </MenuItem>
                          ))}
                        </Menu>
                      </>
                    ) : null
                  ) : (
                    <>
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={(e) => handleClick(e, item.name)}
                        className={classes.menuBtn}
                      >
                        {item.label}
                        <ArrowDropDownIcon
                          color="disabled"
                          style={{ color: "#CBD5DB" }}
                        />
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl ? anchorEl[item?.name] : null}
                        keepMounted
                        open={Boolean(anchorEl ? anchorEl[item?.name] : null)}
                        onClose={(e) => handleClose(e, item?.name)}
                        className={classes.menu}
                      >
                        {item?.options.map((item, index) => (
                          <MenuItem
                            onClick={(e) =>
                              handleMenuClick(e, item.name, item.url)
                            }
                            key={index}
                            className={classes.menuItem}
                          >
                            {item.order}
                          </MenuItem>
                        ))}
                      </Menu>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className={classes.rightPart}>
            <p onClick={handleAccountPage}>Hesap</p>
            <p onClick={handleLogout}>Çıkış</p>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
