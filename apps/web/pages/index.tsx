import { NextPage } from "next";
import { Grid, Box } from "@mui/material";
import CareerSelect, { CareerSelectProps } from "@/components/CareerSelect";

export { getStaticProps } from "../src/controllers/Home";

export type HomeProps = CareerSelectProps;

const Home: NextPage<HomeProps> = ({ careers }) => {
  return (
    <Box sx={{ height: "95vh" }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <CareerSelect careers={careers} />
      </Grid>
    </Box>
  );
};

export default Home;
