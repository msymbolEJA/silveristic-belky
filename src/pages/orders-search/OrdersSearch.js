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
    marginBottom: 20,
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
    display: "block",
    marginLeft: 10,
    fontSize: "0.9rem",
  },
  select: {
    width: 90,
    display: "block",
    marginLeft: 8,
    marginBottom: 15,
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

const initialValues = {
  id: "",
  status: "",
  sku: "",
  supplier: "",
  internalNote: "",
  receiptId: "",
  trackingCode: "",
};

const OrdersSearch = () => {
  const classes = useStyles();
  const [rows, setRows] = useState();
  const [searchInfo, setSearchInfo] = useState(initialValues);

  // useEffect(() => {
  //   getData(`${BASE_URL}etsy/orders/?status=in_transit&limit=25&offset=0`).then(
  //     (response) => {
  //       console.log(response.data);
  //       setRows(response.data.results);
  //     }
  //   );
  // }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchInfo);
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setSearchInfo({ ...searchInfo, [e.target.name]: e.target.value });
  };

  const handleClear = (e) => {
    e.preventDefault();
    setSearchInfo(initialValues);
  };

  const handleValueSearch = (e) => {
    e.preventDefault();
    console.log("handleValueSearch");
    console.log(searchInfo);
  };

  return (
    <div>
      {rows === undefined ? (
        <div className={classes.searchRoot}>
          <div className={classes.firstDiv}>
            <form>
              <div className={classes.innerCont}>
                <p className={classes.title}>Combined Search</p>
                <label htmlFor="id" className={classes.inputTitle}>
                  ID:
                </label>
                <input
                  name="id"
                  id="id"
                  className={classes.input}
                  placeholder="XXXXXX"
                  value={searchInfo.id}
                  onChange={(e) => handleChange(e)}
                  type="number"
                />
                <label htmlFor="status" className={classes.inputTitle}>
                  Status:
                </label>
                <select
                  name="status"
                  id="status"
                  className={classes.select}
                  value={searchInfo.status}
                  onChange={(e) => handleChange(e)}
                >
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
                <label htmlFor="sku" className={classes.inputTitle}>
                  SKU:
                </label>
                <input
                  name="sku"
                  id="sku"
                  className={classes.input}
                  value={searchInfo.sku}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="supplier" className={classes.inputTitle}>
                  Supplier:
                </label>
                <select
                  name="supplier"
                  id="supplier"
                  className={classes.select}
                  value={searchInfo.supplier}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="all">all</option>
                  <option value="asya">asya</option>
                  <option value="beyazit">beyazit</option>
                  <option value="stok">stok</option>
                </select>
                <label htmlFor="internalNote" className={classes.inputTitle}>
                  Internal Note:
                </label>
                <input
                  name="internalNote"
                  id="internalNote"
                  className={classes.input}
                  value={searchInfo.internalNote}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className={classes.search}
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button className={classes.clear} onClick={handleClear}>
                  Clear
                </button>
              </div>
            </form>
          </div>
          <div className={classes.firstDiv}>
            <form>
              <div className={classes.innerCont}>
                <p className={classes.title}>Value Search</p>
                <label htmlFor="receiptId" className={classes.inputTitle}>
                  Receipt Id:
                </label>
                <input
                  className={classes.input}
                  id="receiptId"
                  name="receiptId"
                  value={searchInfo.receiptId}
                  onChange={(e) => handleChange(e)}
                />
                <label htmlFor="trackingCode" className={classes.inputTitle}>
                  Tracking Code:
                </label>
                <input
                  id="trackingCode"
                  name="trackingCode"
                  className={classes.input}
                  value={searchInfo.trackingCode}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div>
                <button
                  className={classes.search}
                  onClick={handleValueSearch}
                  type="submit"
                >
                  Search
                </button>
                <button className={classes.clear} onClick={handleClear}>
                  Clear
                </button>
              </div>
            </form>
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
