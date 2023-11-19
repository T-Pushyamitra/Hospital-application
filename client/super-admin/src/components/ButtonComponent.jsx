import React from "react";
import Button from "@mui/material/Button";
import "./Button.scss";

const ButtonComponent = ({buttonText}) => {
  return <Button className="Button" variant="contained">{buttonText}</Button>;
};

export default ButtonComponent;
