import {
  Autocomplete,
  TextField,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { FC, memo, Fragment, ReactNode, useMemo } from "react";
import { Delete } from "@mui/icons-material";
import { useCourses } from "@/providers/Courses";
import { CircularProgress } from "@mui/material";
import { CourseData, useStore } from "@/store";
import SectionSelect from "./SectionSelect";
import SubjectSelect from "./SubjectSelect";

export type CourseSelectProps = {
  course: CourseData;
  selectedCoursesIndex: number;
};

const CourseSelect: FC<CourseSelectProps> = memo(function CourseSelect({
  course,
  selectedCoursesIndex,
}) {
  const removeCourse = useStore((store) => store.removeCourse);
  const selectedCoursesLength = useStore(
    (store) => store.selectedCourses.length
  );
  const deleteIsDisabled = selectedCoursesLength <= 1;
  const deleteButton = useMemo(
    () => (
      <IconButton
        aria-label="delete"
        disabled={deleteIsDisabled}
        color="error"
        onClick={() => removeCourse(selectedCoursesIndex)}
      >
        <Delete />
      </IconButton>
    ),
    [deleteIsDisabled, removeCourse, selectedCoursesIndex]
  );
  return (
    <Grid container spacing={1} pb={3} alignItems={"center"}>
      <Grid item xs={7}>
        <SubjectSelect
          course={course}
          selectedCoursesIndex={selectedCoursesIndex}
        />
      </Grid>
      <Grid item xs={4}>
        <SectionSelect
          course={course}
          selectedCoursesIndex={selectedCoursesIndex}
        />
      </Grid>
      <Grid item xs={1}>
        {deleteIsDisabled ? (
          deleteButton
        ) : (
          <Tooltip title="Eliminar">{deleteButton}</Tooltip>
        )}
      </Grid>
    </Grid>
  );
});

export default CourseSelect;
