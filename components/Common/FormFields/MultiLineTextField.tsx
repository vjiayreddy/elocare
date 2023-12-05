import React from "react";
import TextField from "@mui/material/TextField";
import { Control, Controller, FieldValues } from "react-hook-form";

const MultiLineTextFieldComponent = () => {
  return <TextField size="medium" multiline rows={4} fullWidth />;
};

export default MultiLineTextFieldComponent;
