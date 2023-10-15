import FormControl from "@mui/material/FormControl";
import React, { memo } from "react";

type FormProps = React.PropsWithChildren<{}>;

const Form: React.FC<FormProps> = memo(function Form({ children }) {
  return <FormControl sx={{ width: "100%" }}>{children}</FormControl>;
});

export default Form;
