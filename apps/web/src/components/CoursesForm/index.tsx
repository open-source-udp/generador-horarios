import { memo, FC } from "react";
import { Button, FormControl } from "@mui/material";
import CourseSelect from "./CourseSelect";
import StrategySelect from "./StrategySelect";
import useCourseForm from "./hooks/useCourseForm";
import { LoadingButton } from "@mui/lab";

const CoursesForm: FC = memo(function CoursesForm() {
  const { selectedCourses, addCourse, handleSubmit, isLoading } =
    useCourseForm();
  return (
    <form onSubmit={handleSubmit}>
      <StrategySelect />
      {selectedCourses.map((course, index) => (
        <CourseSelect
          key={index}
          course={course}
          selectedCoursesIndex={index}
        />
      ))}
      <LoadingButton
        onClick={addCourse}
        variant="contained"
        color="primary"
        sx={{ marginTop: "20px" }}
        disabled={selectedCourses.length >= 7}
        fullWidth
        loading={isLoading}
      >
        Agregar otro ramo
      </LoadingButton>
      <LoadingButton
        variant="contained"
        color="success"
        sx={{ marginTop: "10px" }}
        fullWidth
        type="submit"
        disabled={selectedCourses
          .filter((c) => c)
          .every((c) => c.selectedSection?.code)}
        loading={isLoading}
      >
        Generar horario
      </LoadingButton>
    </form>
  );
});

export default CoursesForm;
