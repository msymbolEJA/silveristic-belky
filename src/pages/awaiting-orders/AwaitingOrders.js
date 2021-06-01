import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "50px",
    marginLeft: "10px",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "white",
    textTransform: "none",
    width: "200px",
    margin: "10px",
    "&:hover": {
      backgroundColor: "#0069D9",
    },
  },
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  labels: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1.5rem",
  },
}));

const AwaitingOrders = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>Bekleyen Siparişleriniz</h2>
      <h3>{"0"} result found!</h3>
      <div className={classes.btnGroup}>
        <Button variant="contained" className={classes.button}>
          All
        </Button>
        <Button variant="contained" className={classes.button}>
          USA
        </Button>
        <Button variant="contained" className={classes.button}>
          International
        </Button>
      </div>
      <div className={classes.btnGroup}>
        <Button variant="contained" className={classes.button}>
          Yazdır
        </Button>
      </div>
      <div className={classes.labels}>
        <h2>Eski Labellar</h2>
        <a
          href="http://45.76.235.108/static/pdf/bulk/admin/05_19_2021-15_24.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          admin/05_19_2021-15_24.pdf
        </a>
        <a
          href="http://45.76.235.108/static/pdf/bulk/admin/05_19_2021-15_24.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          admin/05_19_2021-15_24.pdf
        </a>
        <a
          href="http://45.76.235.108/static/pdf/bulk/admin/05_19_2021-15_24.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          admin/05_19_2021-15_24.pdf
        </a>
      </div>
    </div>
  );
};

export default AwaitingOrders;
