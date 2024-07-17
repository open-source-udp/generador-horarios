import { CourseData, useStore } from "@/store";
import type { TimetableProps } from "./index";

const withCourses = (
  WrappedComponent: React.ComponentType<TimetableProps>,
  courses: CourseData[]
) => {
  const timeBlocks: TimetableProps["timeBlocks"] = [];
  for (const course of courses) {
    if (course && course.selectedSection) {
      for (const timeBlock of course.selectedSection.timeBlocks) {
        timeBlocks.push({
          course: course,
          day: timeBlock.day,
          block: timeBlock.block,
          description: timeBlock.description,
          isMandatory: timeBlock.isMandatory,
          teacher: timeBlock.teacher,
        });
      }
    }
  }
  return <WrappedComponent timeBlocks={timeBlocks} />;
};

export default withCourses;
