import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { postFormData } from "../../helper/PostData";
import {
  toastErrorNotify,
  toastSuccessNotify,
} from "../../components/otheritems/ToastNotify";
import { FormattedMessage, useIntl } from "react-intl";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  rootBottom: {
    minHeight: "10vh",
    margin: "25px",
    marginBottom: theme.spacing(2),
    textAlign: "center",
  },
  container: {
    // maxHeight: "83vh",
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  header: {
    fontSize: "1.5rem",
  },
  sub: {
    fontSize: "1rem",
  },
  inputStyle: {
    backgroundColor: "white",
    borderRadius: "5px",
  },
  submit: {
    marginBottom: theme.spacing(1),
  },
  button: {
    color: "#17A2B8",
    textTransform: "none",
    border: "1px solid #17A2B8",
    // marginRight: "5px",
    width: "fit-content",
    paddingTop: "3px",
    paddingBottom: "3px",
    fontSize: "1rem",
    paddingRight: "12px",
    paddingLeft: "12px",
    cursor: "pointer",
    backgroundColor: "#fff",
    borderRadius: "3px",
    "&:hover": {
      backgroundColor: "#17A2B8",
      color: "white",
    },
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "center",
    padding: "20px",
  },
}));

const CargoPage = ({ getListFunc, id, setRefresh }) => {
  const { formatMessage } = useIntl();

  const [cargoForm, setCargoForm] = useState({
    ref_number_f: "",
    tracking_number: "",
    carrier: "",
    id: id,
    date: "",
  });
  const [result, setResult] = useState();
  const classes = useStyles();
  //console.log("CP Id", id);

  const cargoFormPost = (e) => {
    e.preventDefault();
    let d = new Date();
    cargoForm.ref_number =
      d
        .toISOString()
        ?.replaceAll("-", "")
        ?.replaceAll(":", "")
        ?.replaceAll(".", "") +
      `- ${cargoForm.ref_number_f} (${cargoForm.date})`;
    delete cargoForm.ref_number_f;
    delete cargoForm.date;

    postFormData(`${BASE_URL}etsy/cargo_one/`, cargoForm)
      .then((res) => {
        toastSuccessNotify(res.data.Success);
        setResult(res.data.Success);
      })
      .catch(({ response }) => {
        setResult(response.data.Failed);
        toastErrorNotify(response.data.Failed);
      })
      .finally(() => {
        if (setRefresh) setRefresh(true);
      });
    setCargoForm({
      ref_number_f: "",
      tracking_number: "",
      carrier: "",
    });
    try {
      getListFunc();
    } catch (error) {
      //console.log(error);
    }
  };

  const handleChange = (e) => {
    setCargoForm({ ...cargoForm, [e.target.name]: e.target.value });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.rootBottom}>
        <h1>G??nderi Olu??turma</h1>
        <form
          className={classes.root}
          autoComplete="off"
          onSubmit={cargoFormPost}
        >
          <TextField
            className={classes.inputStyle}
            id="tracking_number"
            label={formatMessage({
              id: "trackingNumber",
              defaultMessage: "Tracking Number",
            })}
            required
            type="text"
            onChange={handleChange}
            variant="outlined"
            name="tracking_number"
            value={cargoForm.tracking_number}
          />
          <TextField
            className={classes.inputStyle}
            id="carrier"
            label={formatMessage({
              id: "carrier",
              defaultMessage: "Carrier",
            })}
            required
            type="text"
            name="carrier"
            onChange={handleChange}
            variant="outlined"
            value={cargoForm.carrier}
          />
          <TextField
            id="date"
            name="date"
            label={formatMessage({
              id: "cargoDate",
              defaultMessage: "Cargo Date",
            })}
            type="date"
            variant="outlined"
            value={cargoForm.date}
            onChange={handleChange}
            className={classes.inputStyle}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className={classes.inputStyle}
            id="ref_number_f"
            label={formatMessage({
              id: "description",
              defaultMessage: "Description",
            })}
            required={true}
            type="text"
            variant="outlined"
            name="ref_number_f"
            onChange={handleChange}
            value={cargoForm.ref_number_f}
          />
          <div className={classes.buttonDiv}>
            <button className={classes.button} type="submit">
              Paketlemek isted??inize emin misiniz?
            </button>
          </div>
        </form>
      </Paper>
      {result ? <h1>{result}</h1> : null}
    </div>
  );
};

export default CargoPage;
