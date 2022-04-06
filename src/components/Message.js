import React from "react";

function Message(props) {
  return (
    <p className={props.classes}>
      <label htmlFor="field">{props.message}</label>{" "}
    </p>
  );
}
export default Message;
