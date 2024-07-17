import { useStore } from "@/store";
import { SubjectWithSections, useCourses } from "@/providers/Courses";
import type { AutocompleteProps } from "@mui/material";
import { useMemo } from "react";

function removeDuplicates(arr: SubjectWithSections[]) {
  return arr.filter((item) => arr.find((x) => x.code === item.code) === item);
}

const useSubjectSelect = (selectedCoursesIndex: number) => {
  const courses = useCourses();
  const selectCourse = useStore((store) => store.selectCourse);
  const selectedCourses = useStore((store) => store.selectedCourses);
  const onChange = (_, value) => {
    if (value) {
      selectCourse(selectedCoursesIndex, value);
    } else {
      selectCourse(selectedCoursesIndex, null);
    }
  };
  const getOptionDisabled = (option) =>
    Boolean(selectedCourses.find((c) => c?.code === option.code));

  return {
    subjects: removeDuplicates(courses.subjects),
    onChange,
    getOptionDisabled,
  };
};

export default useSubjectSelect;
