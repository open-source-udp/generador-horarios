import { CourseData } from "@/store";
import timeBlocksDontOverlap from "../../timeBlocksDontOverlap";
import { generateSchedulingParams, strategies } from "..";

export function dfs({
  alreadySelectedCourses,
  notSelectedCourses,
  strategy,
}: generateSchedulingParams): CourseData[] | null {
  const getWeight = strategies[strategy];
  if (!notSelectedCourses.length) {
    return alreadySelectedCourses;
  }
  const course = notSelectedCourses[0];
  const results = [];

  const possibleSections = course.sections;
  for (const section of possibleSections) {
    const newAlreadySelectedCourses = [
      ...alreadySelectedCourses,
      { ...course, selectedSection: section },
    ];

    const timeBlocks = newAlreadySelectedCourses.flatMap(
      (course) => course.selectedSection.timeBlocks
    );
    if (timeBlocksDontOverlap(timeBlocks)) {
      const result = dfs({
        alreadySelectedCourses: newAlreadySelectedCourses,
        notSelectedCourses: notSelectedCourses.slice(1),
        strategy,
      });
      if (result) {
        results.push(result);
        continue;
      }
    }
  }

  if (results.length) {
    return results.reduce((prev, curr) => {
      if (getWeight(curr) < getWeight(prev)) {
        return curr;
      }
      return prev;
    });
  }
  return null;
}

export default dfs;
