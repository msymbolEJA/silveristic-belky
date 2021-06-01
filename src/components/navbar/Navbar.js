import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import { NavbarOptions } from "../..//helper/Constants";

const STORE_NAME = process.env.REACT_APP_STORE_NAME;

const MyNativeSelect = withStyles({
  root: {
    width: 100,
  },
  icon: {
    color: "lightgrey",
  },
})(NativeSelect);

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
  rightTitle: {
    fontSize: "1.25rem",
  },
  toolbar: {
    backgroundColor: "#BA000D",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rightPart: {
    display: "flex",
    cursor: "pointer",
    "& p": {
      margin: "5px",
      color: "lightgrey",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  optionStyle: {
    color: "black",
  },
  selectEmpty: {
    color: "lightgrey",
  },
}));

export default function MenuAppBar() {
  const classes = useStyles(); // eslint-disable-next-line
  const history = useHistory();
  const [orderOpt, setOrderOpt] = useState("");

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

  const handleOrderChange = (event) => {
    setOrderOpt(event.target.value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar
          className={classes.toolbar}
          variant="dense"
          style={{ height: "50px" }}
        >
          <div className={classes.leftPart} onClick={handleMainPage}>
            <h1 className={classes.rightTitle}>{STORE_NAME.toUpperCase()}</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {NavbarOptions?.map((item) => (
                <FormControl className={classes.formControl} key={item.name}>
                  <MyNativeSelect
                    className={classes.selectEmpty}
                    value={orderOpt}
                    name={item.name}
                    onChange={handleOrderChange}
                    inputProps={{ "aria-label": "age" }}
                  >
                    <option value="" disabled>
                      {item.label}
                    </option>
                    {item.options?.map((order) => (
                      <option
                        value={order.order}
                        className={classes.optionStyle}
                        key={order.order}
                      >
                        {order.order}
                      </option>
                    ))}
                  </MyNativeSelect>
                </FormControl>
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
