import { TimeBlockWithCourse } from "@/components/Timetable";
import { TimeBlockData } from "@/models/sections";
import { CourseData } from "@/store";

export default function getTimeblocksFromCoursesData(
  courses: Array<CourseData>
) {
  const timeBlocks: Array<TimeBlockWithCourse> = [];
  for (const course of courses) {
    if (course && course.selectedSection) {
      for (const timeBlock of course.selectedSection.timeBlocks) {
        timeBlocks.push({
          ...timeBlock,
          course: course,
        });
      }
    }
  }
  return timeBlocks;
}
