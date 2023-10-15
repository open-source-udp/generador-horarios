import CareerSelect, { CareerSelectProps } from "@/components/CareerSelect";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Box from "@mui/material/Box";

export type IndexProps = { files: CareerSelectProps["careers"] };

export default function Page({ files }: IndexProps) {
  return (
    <Grid xs={10}>
      <Box sx={{ marginBottom: 15 }}>
        <CareerSelect careers={files} />
      </Box>
    </Grid>
  );
}
