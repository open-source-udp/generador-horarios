"use client";
import { memo, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Timetable } from "../Timetable";
import SubjectForm from "@/components/SubjectForm";
import { useSelectedSubjects } from "@/store/selectedSubjects";

type CareerProps = {
  params: { career: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const Career: React.FC<CareerProps> = memo(function Career({ params }) {
  return (
    <>
      <Grid lg={6}>
        <Timetable />
      </Grid>
      <Grid lg={4}>
        <SubjectForm />
      </Grid>
    </>
  );
});

export default Career;
