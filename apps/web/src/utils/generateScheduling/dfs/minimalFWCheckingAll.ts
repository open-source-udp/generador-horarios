import { CourseData } from "@/store";
import timeBlocksDontOverlap from "../../timeBlocksDontOverlap";
import { generateSchedulingParams, strategies } from "..";

export function dfs({
  alreadySelectedCourses,
  notSelectedCourses,
  strategy,
  results = [],
}: generateSchedulingParams & { results: Array<CourseData[]> }):
  | CourseData[]
  | null {
  const getWeight = strategies[strategy];
  if (!notSelectedCourses.length) {
    return alreadySelectedCourses;
  }
  const course = notSelectedCourses[0];

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
        results,
      });
      if (result) {
        results.push(result);
        continue;
      }
    }
  }

  return null;
}

function getAll({
  alreadySelectedCourses,
  notSelectedCourses,
  strategy,
}: generateSchedulingParams) {
  const results: Array<CourseData[]> = [];
  dfs({
    alreadySelectedCourses,
    notSelectedCourses,
    strategy,
    results,
  });
  return results.sort(
    (a, b) => strategies[strategy](a) - strategies[strategy](b)
  );
}

export default getAll;
