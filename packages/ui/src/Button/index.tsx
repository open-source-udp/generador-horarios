"use client";
import { Button as MUIButton } from "@mui/material";
import React, { memo } from "react";

export type ButtonProps = React.PropsWithChildren & {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = memo(function Button({
  children,
  onClick,
}) {
  return <MUIButton onClick={onClick}>{children}</MUIButton>;
});

export default Button;
