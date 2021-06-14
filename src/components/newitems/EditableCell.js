import React, { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ContentEditable from "react-contenteditable";
import FontPreview from "../tableitems/FontPreview";

const useStyles = makeStyles(() => ({
  tableCell: {
    padding: 0,
    width: "100px",

    //minWidth: "100px",
    maxWidth: "100px",
    borderRight: "0.5px solid #E0E0E0",
  },
  input: {
    width: "100px",
    minHeight: "100px",
    background: "transparent",
    resize: "none",
    border: "none",
    wordWrap: "break-word",
  },
  explanationTableCell: {
    padding: 0,
    width: "100px",
    // minHeight: "100px",
    borderRight: "0.5px solid #E0E0E0",
    maxWidth: "300px",
  },
  explanationInput: {
    fontSize: "1rem",
    maxHeight: "100%",
    width: "100%",
    minWidth: "190px",
    maxWidth: "190px",
    //wordWrap: "break-word"
  },
  editable: {
    // minHeight: "109px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

/* <TextareaAutosize aria-label="empty textarea" placeholder="Empty" />
 */

const EditableTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const [content, setContent] = useState(row[name] || "");

  const handleContentChange = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  const handleBlur = useCallback(
    (e) => {
      onChange(e, row.id, name);
    },
    // eslint-disable-next-line
    [onChange, row]
  );

  return (
    <div
      align="center"
      //  onClick={(e) => handleRowClick(row.id, name)}
      style={{
        backgroundColor:
          name === "supplier" &&
          (row[name] === " " || row[name] === "" || row[name] === null)
            ? "#FF9494"
            : null,
      }}
    >
      {name === "qty" && content.includes("FONT") ? (
        <>
          <FontPreview
            id={row.id}
            font={content}
            text={row["personalization"]}
          />
        </>
      ) : null}
      <ContentEditable
        className={classes.editable}
        html={content} // innerHTML of the editable div
        disabled={false} // use true to disable edition
        onChange={handleContentChange} // handle innerHTML change
        onBlur={handleBlur} // handle innerHTML change
      />
    </div>
  );
};

export default EditableTableCell;
