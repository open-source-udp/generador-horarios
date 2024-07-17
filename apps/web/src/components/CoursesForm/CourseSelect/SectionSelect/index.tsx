import { Autocomplete, TextField } from "@mui/material";
import { FC, memo, Fragment, ReactNode } from "react";
import { CircularProgress } from "@mui/material";
import { CourseData, useStore } from "@/store";
import useSectionSelect from "./useSectionSelect";

export type SectionSelectProps = {
  course: CourseData;
  selectedCoursesIndex: number;
};

const SectionSelect: FC<SectionSelectProps> = memo(function SectionSelect({
  course,
  selectedCoursesIndex,
}) {
  const { getOptionDisabled, sections, sectionsAreLoading, onChange } =
    useSectionSelect(course, selectedCoursesIndex);
  return (
    <Autocomplete
      defaultValue={null}
      disabled={!course}
      options={sections}
      getOptionDisabled={getOptionDisabled}
      getOptionLabel={(option) =>
        option ? option.section.replace("Sección ", "") : "Auto"
      }
      value={course?.selectedSection || null}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Sección"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {sectionsAreLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option) => {
        let inner: ReactNode = "Auto";
        if (option !== null) {
          inner = (
            <Fragment>
              {option.section.startsWith("Sec")
                ? `S. ${option.section.split(" ")[1]}`
                : option.section}
              <br />
              <small>{option.code}</small>
            </Fragment>
          );
        }
        return (
          <li {...props} style={{ flexDirection: "column" }}>
            {inner}
          </li>
        );
      }}
      onChange={onChange}
    />
  );
});

export default SectionSelect;
