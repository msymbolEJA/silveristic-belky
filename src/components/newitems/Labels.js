import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { getAllPdf } from "../../helper/PostData";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles(() => ({
  labels: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1.5rem",
  },
}));

const Labels = () => {
  const classes = useStyles();
  const [allPdf, setAllPdf] = useState();

  const getAllPdfFunc = () => {
    getAllPdf(`${BASE_URL}etsy/all_pdf/`)
      .then((response) => {
        setAllPdf(response.data.a);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllPdfFunc();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className={classes.labels}>
        <h2>Eski Labellar</h2>
        {allPdf?.length === 0 ? (
          <h4>Herhangi bir label yok!</h4>
        ) : (
          allPdf?.map((pdf, index) => (
            <div key={`${index}${pdf}`}>
              <a
                href={`${BASE_URL}media/pdf/bulk/${pdf}`}
                target="_blank"
                rel="noreferrer"
              >
                {pdf}
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Labels;
