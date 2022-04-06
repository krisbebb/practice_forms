import React from "react";

function Message({ classes, message }) {
  return (
    <p className={classes}>
      <label htmlFor="field">{message}</label>{" "}
    </p>
  );
}
export default Message;
