import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomTable from "../../components/newitems/ChangableTable";
import { getData } from "../../helper/PostData";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles(() => ({
  searchRoot: {
    margin: "0px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  firstDiv: {
    backgroundColor: "#BDCAFF",
    width: "480px",
    margin: "20px",
    border: "1px solid black",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
  },
  innerCont: {
    margin: 10,
  },
  input: {
    margin: 0,
    marginLeft: 8,
    border: "none",
    padding: "5px",
    width: 80,
    borderRadius: "5px",
    "&:focus": {
      outline: "none !important",
      boxShadow: "0 0 10px #0069D9",
    },
  },
  inputTitle: {
    marginBottom: 10,
    marginLeft: 10,
    fontSize: "0.9rem",
  },
  select: {
    width: 90,
    display: "block",
    marginLeft: 8,
    margin: 0,
    border: "none",
    padding: "5px",
    borderRadius: "5px",
    "&:focus": {
      outline: "none !important",
      boxShadow: "0 0 10px #0069D9",
    },
  },
  title: {
    fontSize: "1.2rem",
    margin: 0,
  },
  search: {
    backgroundColor: "#007BFF",
    margin: 5,
    padding: 5,
    width: 65,
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0069D9",
    },
  },
  clear: {
    backgroundColor: "#6C757D",
    padding: 5,
    width: 50,
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#5A6268",
    },
  },
  resultDiv: {
    marginLeft: 15,
    paddingTop: 10,
  },
  nSBtn: {
    backgroundColor: "#007BFF",
    padding: 5,
    width: 100,
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#0069D9",
    },
  },
  foundResult: {
    fontWeight: "bold",
    marginTop: 5,
  },
}));

const OrdersSearch = () => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getData(`${BASE_URL}etsy/orders/?status=in_transit&limit=25&offset=0`).then(
      (response) => {
        console.log(response.data);
        setRows(response.data.results);
      }
    );
  }, []);

  return (
    <div>
      {rows === undefined ? (
        <div className={classes.searchRoot}>
          <div className={classes.firstDiv}>
            <div className={classes.innerCont}>
              <p className={classes.title}>Combined Search</p>
              <p className={classes.inputTitle}>ID:</p>
              <input className={classes.input} placeholder="XXXXXX" />
              <p className={classes.inputTitle}>Status:</p>
              <select id="status" className={classes.select}>
                <option value="all">all</option>
                <option value="awaiting">awaiting</option>
                <option value="processing">processing</option>
                <option value="ready">ready</option>
                <option value="in_transit">in_transit</option>
                <option value="repeat">repeat</option>
                <option value="shipped">shipped</option>
                <option value="cancelled">cancelled</option>
                <option value="follow_up">follow_up</option>
              </select>
              <p className={classes.inputTitle}>SKU:</p>
              <input className={classes.input} />
              <p className={classes.inputTitle}>Supplier:</p>
              <select id="status" className={classes.select}>
                <option value="all">all</option>
                <option value="asya">asya</option>
                <option value="beyazit">beyazit</option>
                <option value="stok">stok</option>
              </select>
              <p className={classes.inputTitle}>Internal Note:</p>
              <input className={classes.input} />
            </div>
            <div>
              <button className={classes.search}>Search</button>
              <button className={classes.clear}>Clear</button>
            </div>
          </div>
          <div className={classes.firstDiv}>
            <div className={classes.innerCont}>
              <p className={classes.title}>Value Search</p>
              <p className={classes.inputTitle}>Receipt Id:</p>
              <input className={classes.input} placeholder="XXXXXX" />
              <p className={classes.inputTitle}>Tracking Code:</p>
              <input className={classes.input} />
            </div>
            <div>
              <button className={classes.search}>Search</button>
              <button className={classes.clear}>Clear</button>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.resultDiv}>
          <button className={classes.nSBtn}>New Search</button>
          <p className={classes.foundResult}>{rows.length} Result Form</p>
          <CustomTable rows={rows} />
        </div>
      )}
    </div>
  );
};

export default OrdersSearch;
