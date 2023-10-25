"use client";
import { Button as MUIButton } from "@mui/material";
import React, { memo } from "react";

export type ButtonProps = React.PropsWithChildren & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = memo(function Button({
  children,
  onClick,
  disabled,
  type = "button",
}) {
  return (
    <MUIButton onClick={onClick} disabled={disabled} type={type}>
      {children}
    </MUIButton>
  );
});

export default Button;
