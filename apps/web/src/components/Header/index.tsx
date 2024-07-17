/* eslint-disable turbo/no-undeclared-env-vars */
import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header
      style={{
        margin: 0,
        height: "5vh",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ padding: "7px" }}>
        <Typography padding={"auto"}>
          Actualizado el: {process.env.NEXT_PUBLIC_LAST_UPDATED}
        </Typography>
      </Box>
      <Box sx={{ padding: "7px" }}>
        <Typography>
          Hecho por: <Link href="https://github.com/rolitoxdd">rolitoxdd</Link>
        </Typography>
      </Box>
    </header>
  );
};

export default Header;
