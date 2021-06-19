import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { getData, putData, putImage } from "../../helper/PostData";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles(() => ({
  paper: {
    border: "1px solid lightgrey",
    borderRadius: "5px",
    margin: "10px",
    marginTop: "60px",
  },
  image: {
    width: "125px",
    height: "125px",
    borderRadius: "50%",
    marginTop: "5px",
    marginLeft: "20px",
  },
  imgDiv: {
    display: "flex",
  },
  headerDiv: {
    marginLeft: "20px",
  },
  email: {
    color: "grey",
  },
  midDiv: {
    marginRight: "25px",
    marginLeft: "25px",
  },
  input: {
    padding: 5,
  },
  button: {
    color: "#17A2B8",
    textTransform: "none",
    border: "1px solid #17A2B8",
    // marginRight: "5px",
    width: "fit-content",
    paddingTop: "6px",
    marginTop: 20,
    marginBottom: 25,
    fontSize: "1rem",
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
  imgInput: {
    fontSize: "1rem",
  },
  accountInfo: {
    marginTop: 10,
    fontSize: "1.35rem",
  },
  label: {
    fontSize: "1rem",
    marginBottom: 10,
    marginTop: 25,
  },
  labelEmail: {
    fontSize: "1rem",
    marginTop: 15,
    marginBottom: 10,
  },
}));

const Account = () => {
  const classes = useStyles();
  const [accountData, setAccountData] = useState();
  const [imgFile, setimgFile] = useState();

  const localId = Number(localStorage.getItem("localId"));

  const getInfo = () => {
    getData(`${BASE_URL}account/profile/${localStorage.getItem("localId")}/`)
      .then((response) => {
        console.log("responseData", response.data);
        setAccountData(response.data);
        setimgFile(accountData?.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handleChange = (e) => {
    console.log(e.currentTarget.id);
    console.log(e.currentTarget.value);
    setAccountData({ ...accountData, [e.target.name]: e.target.value });
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    console.log({ accountData });
    try {
      let path = `${BASE_URL}account/profile/${localId}/`;
      putImage(path, imgFile, imgFile.name)
        .then((res) => {
          console.log(res);
        })
        .catch(({ response }) => {
          console.log("errorResponse: ", response);
        })
        .finally(() => {
          getInfo();
        });
      // getInfo();
    } catch (error) {
      console.log(error);
    }
    try {
      let userPath = `${BASE_URL}account/profile/${localId}/`;
      delete accountData.image;
      putData(userPath, accountData)
        .then((res) => {
          console.log(res);
        })
        .catch(({ response }) => {
          console.log(response);
        })
        .finally(() => {
          getInfo();
        });
      getInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const fileSelectedHandler = (e) => {
    setimgFile(e.target.files[0]);
  };

  return (
    <div className={classes.paper}>
      <div className={classes.imgDiv}>
        <img
          src={
            accountData?.image ||
            "https://cdn.dribbble.com/users/304574/screenshots/6222816/male-user-placeholder.png"
          }
          alt="user"
          className={classes.image}
        />
        <div className={classes.headerDiv}>
          <h1 className={classes.header}>{accountData?.username}</h1>
          <h4 className={classes.email}>{accountData?.email}</h4>
        </div>
      </div>
      <form className={classes.midDiv}>
        <h2 className={classes.accountInfo}>Account Info</h2>
        <hr />
        <h4 className={classes.label}>Username</h4>
        <OutlinedInput
          id="username"
          name="username"
          margin="dense"
          value={accountData?.username || ""}
          onChange={(e) => handleChange(e)}
          aria-describedby="outlined-username-helper-text"
          inputProps={{
            "aria-label": "username",
          }}
          className={classes.input}
          fullWidth
        />
        <h4 className={classes.labelEmail}>Email</h4>
        <OutlinedInput
          id="email"
          name="email"
          margin="dense"
          value={accountData?.email || ""}
          onChange={(e) => handleChange(e)}
          aria-describedby="outlined-email-helper-text"
          fullWidth
          inputProps={{
            "aria-label": "email",
          }}
          className={classes.input}
        />
        <h4>Update Profile Picture</h4>
        <input
          type="file"
          onChange={(e) => fileSelectedHandler(e)}
          id="myInput"
          className={classes.imgInput}
        />
        <br />
        <button onClick={handleUpdateClick} className={classes.button}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Account;
