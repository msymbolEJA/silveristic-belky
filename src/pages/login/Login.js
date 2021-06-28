import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { postAuthData } from "../../helper/PostData";
import { AppContext } from "../../context/Context";
import { useHistory } from "react-router-dom";

const STORE_NAME = process.env.REACT_APP_STORE_NAME;
const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles(() => ({
  root: {
    // marginTop: "50px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
  },
  paper: {
    border: "1px solid lightgrey",
    borderRadius: "5px",
    paddingLeft: 20,
    paddingRight: 20,
  },
  errorDiv: {
    marginBottom: 20,
    // marginLeft: 10,
    backgroundColor: "#F8D7DA",
    padding: 15,
    borderRadius: 5,
    color: "#722E35",
    fontWeight: "bold",
  },
  bottomDiv: {
    marginTop: 70,
  },
  bottomInput: {
    padding: 15,
    width: "calc(100vw - 100px)",
    border: "1px solid #DEE2E6",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  inputHeader: {
    marginBottom: 5,
  },
  checkbox: {
    marginTop: 20,
  },
  button: {
    color: "#17A2B8",
    textTransform: "none",
    border: "1px solid #17A2B8",
    backgroundColor: "white",
    fontSize: "1rem",
    width: "fit-content",
    paddingTop: "6px",
    paddingBottom: "6px",
    paddingRight: "12px",
    paddingLeft: "12px",
    cursor: "pointer",
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#17A2B8",
      color: "white",
    },
  },
  buttonDiv: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  fpassword: {
    marginLeft: 10,
  },
  navbarRoot: {
    root: {
      flexGrow: 1,
      marginTop: 50,
    },
  },
  toolbar: {
    backgroundColor: STORE_NAME === "Hilal Serisi" ? "#BA000D" : "#5F788A",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 55,
  },
  leftPart: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  storeName: {
    fontSize: "1.25rem",
    cursor: "pointer",
    marginRight: "1rem",
  },
  rightPart: {
    display: "flex",
    cursor: "pointer",
    "& p": {
      margin: "5px",
      color: "lightgrey",
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const { setUser, setAuth } = useContext(AppContext);
  const history = useHistory();
  const [errorText, setErrorText] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("handleLogin", loginInfo);
    postAuthData(`${BASE_URL}account/login/`, loginInfo)
      .then((response) => {
        // console.log(response);
        setUser(response?.data);
        setErrorText("");
        const token = response?.data?.access;
        if (token) {
          localStorage.setItem("x-auth-token", token);
          localStorage.setItem("localUser", response?.data?.user);
          localStorage.setItem("localEmail", response?.data?.email);
          localStorage.setItem("localRole", response?.data?.role);
          localStorage.setItem("localId", response?.data?.id);
          console.log("Logged in succesfully!");
          setAuth(true);
          if (response?.data?.role === "workshop_designer") {
            history.push("/processing_orders");
          } else {
            history.push("/");
          }
        }
      })
      .catch(({ response }) => {
        console.log(response);
        if (response) {
          try {
            setErrorText(response?.data?.non_field_errors[0]);
          } catch (error) {
            setErrorText("Server Error!");
          }
        } else {
          setErrorText("Something went wrong!");
        }
      });
  };

  const handleFormChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.root}>
      <div className={classes.navbarRoot}>
        <AppBar position="fixed">
          <Toolbar
            className={classes.toolbar}
            variant="dense"
            style={{ height: "50px" }}
          >
            <div className={classes.leftPart}>
              <h1 className={classes.storeName}>{STORE_NAME.toUpperCase()}</h1>
            </div>
            <div className={classes.rightPart}>
              <p>Giriş</p>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <div className={classes.bottomDiv}>
        {errorText && <div className={classes.errorDiv}>{errorText}</div>}
        <div className={classes.paper}>
          <h2>Login </h2>
          <hr />
          <h4 className={classes.inputHeader}>Username</h4>
          <form onSubmit={handleLogin}>
            <input
              className={classes.bottomInput}
              value={loginInfo.username}
              id="username"
              name="username"
              type="username"
              required
              onChange={handleFormChange}
            />
            <h4 className={classes.inputHeader}>Password</h4>
            <input
              className={classes.bottomInput}
              value={loginInfo.password}
              id="password"
              name="password"
              type="password"
              required
              onChange={handleFormChange}
            />
            {/* <input
          className={classes.checkbox}
          type="checkbox"
          id="vehicle1"
          name="vehicle1"
          value="Bike"
          />
        <span>Remember Me</span> */}
            <div className={classes.buttonDiv}>
              <button type="submit" className={classes.button}>
                Login
              </button>
              {/* <p className={classes.fpassword}>Forget Password?</p> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
