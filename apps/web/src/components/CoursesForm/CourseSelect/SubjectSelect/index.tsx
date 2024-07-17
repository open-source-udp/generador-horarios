import { Autocomplete, TextField, Grid } from "@mui/material";
import { FC, memo, Fragment, ReactNode } from "react";
import { useCourses } from "@/providers/Courses";
import { CourseData, useStore } from "@/store";
import useSubjectSelect from "./useSubjectSelect";

export type SubjectSelectProps = {
  course: CourseData;
  selectedCoursesIndex: number;
};

const SubjectSelect: FC<SubjectSelectProps> = memo(function SubjectSelect({
  course,
  selectedCoursesIndex,
}) {
  const { getOptionDisabled, onChange, subjects } =
    useSubjectSelect(selectedCoursesIndex);

  return (
    <Autocomplete
      options={subjects}
      value={course}
      getOptionLabel={(option) => `${option.name} - ${option.code}`}
      getOptionDisabled={getOptionDisabled}
      renderInput={(params) => <TextField {...params} label="Ramo" />}
      renderOption={(props, option) => {
        return (
          <li {...props} style={{ flexDirection: "column" }}>
            {option.name} <br />
            <small>{option.code}</small>
          </li>
        );
      }}
      onChange={onChange}
      isOptionEqualToValue={(option, value) => option.code === value.code}
    />
  );
});

export default SubjectSelect;
