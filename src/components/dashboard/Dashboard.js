/* eslint-disable array-callback-return */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "75px",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    textTransform: "none",
    // width: "200px",
    margin: "10px",
    "&:hover": {
      backgroundColor: "#0069D9",
    },
  },
  btnGroup: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  hrStyle: {
    margin: 10,
  },
  input: {
    padding: 8,
    borderRadius: "1px",
    border: "1px solid grey",
  },
  inpBtn: {
    marginLeft: 5,
    padding: 9,
    backgroundColor: "#6C757D",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#5A6268",
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  const handleRoute = (event) => {
    history.push(`/${event.currentTarget.id}`);
  };

  return (
    <div className={classes.root}>
      <h2 className={classes.header}>Toplu İşlemler</h2>
      <hr className={classes.hrStyle} />
      <div className={classes.btnGroup}>
        <Button
          variant="contained"
          onClick={handleRoute}
          className={classes.button}
          id="awaiting_orders"
        >
          Bekleyen Siparişler
        </Button>
        <Button
          variant="contained"
          id="due-dates"
          onClick={handleRoute}
          className={classes.button}
        >
          Sipariş Takip
        </Button>
        <Button
          variant="contained"
          id="shipment-content"
          onClick={handleRoute}
          className={classes.button}
        >
          Gönderi Listesi
        </Button>
      </div>
      <h2 className={classes.header}>Manuel Label</h2>
      <hr className={classes.hrStyle} />
      <p>
        Aralarında bosluk olacak şekilde siparis idleri ile aratma
        yapabilirsiniz
      </p>
      <form>
        <input type="text" className={classes.input} />
        <input type="submit" value="Ara" className={classes.inpBtn} />
      </form>
    </div>
  );
};

export default Dashboard;
