"use client";
import FormControl from "@mui/material/FormControl";
import React, { memo } from "react";

type FormProps = React.PropsWithChildren<{
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}>;

const Form: React.FC<FormProps> = memo(function Form({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <FormControl sx={{ width: "100%" }}>{children}</FormControl>
    </form>
  );
});

export default Form;
