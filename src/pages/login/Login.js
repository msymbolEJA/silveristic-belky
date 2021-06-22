import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

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
  bottomInput: {
    padding: 15,
    width: "calc(100vw - 100px)",
    border: "1px solid #DEE2E6",
    borderRadius: "5px",
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
}));

const Login = () => {
  const classes = useStyles();
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

  const handleLogin = () => {
    console.log("handleLogin", loginInfo);
  };

  const handleFormChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <h2>Login </h2>
        <hr />
        <h4 className={classes.inputHeader}>Email</h4>
        <input
          className={classes.bottomInput}
          value={loginInfo.email}
          id="email"
          name="email"
          type="email"
          onChange={handleFormChange}
        />
        <h4 className={classes.inputHeader}>Password</h4>
        <input
          className={classes.bottomInput}
          value={loginInfo.password}
          id="password"
          name="password"
          type="password"
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
          <div className={classes.button} onClick={() => handleLogin()}>
            Login
          </div>
          {/* <p className={classes.fpassword}>Forget Password?</p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
