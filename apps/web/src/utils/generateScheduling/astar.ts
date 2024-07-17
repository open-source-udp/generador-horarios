import { CourseData } from "@/store";
import timeBlocksDontOverlap from "../timeBlocksDontOverlap";
import { generateSchedulingParams } from ".";
import { SectionData } from "@/models/sections";
import getWindowsFromCoursesData from "../getWindowsFromCoursesData";
import getNumberOfEarlyFreeBlocks from "../getNumberOfEarlyFreeBlocks";
import { strategies } from ".";

export function astar({
  alreadySelectedCourses,
  notSelectedCourses,
  minNumberOfWindows = Number.MAX_SAFE_INTEGER,
  strategy,
}: generateSchedulingParams & { minNumberOfWindows?: number }):
  | CourseData[]
  | null {
  const getWeight = strategies[strategy];
  if (
    getWeight(alreadySelectedCourses) >= minNumberOfWindows &&
    alreadySelectedCourses.length > 1
  ) {
    return null; // if the number of windows is already greater than the minimum reached we can stop
  }
  if (!notSelectedCourses.length) {
    const numberOfWindows = getWeight(alreadySelectedCourses);
    if (numberOfWindows < minNumberOfWindows) {
      return alreadySelectedCourses; // if we have a new minimum, return the result
    } else {
      return null;
    }
  }
  const possibleCourses = notSelectedCourses
    .flatMap((course) =>
      course.sections.map((section) => ({
        ...course,
        selectedSection: section,
      }))
    )
    .filter((course) =>
      timeBlocksDontOverlap([...alreadySelectedCourses, course])
    );
  if (!possibleCourses.length) {
    return null; // if there are no possible courses, we can stop cause the course selection is invalid
  }

  // const coursesOrderedByWindowsAdded = possibleCourses.sort(
  //   (a, b) =>
  //     getWeight([...alreadySelectedCourses, b]) -
  //     getWeight([...alreadySelectedCourses, a])
  // );

  let result = null;
  for (const course of possibleCourses) {
    const newNotSelectedCourses = notSelectedCourses.filter(
      (notSelectedCourse) => notSelectedCourse.code !== course.code
    );
    if (
      getWeight([...alreadySelectedCourses, course]) >= minNumberOfWindows &&
      alreadySelectedCourses.length > 1
    ) {
      continue;
    }
    const partialResult = astar({
      alreadySelectedCourses: [...alreadySelectedCourses, course],
      notSelectedCourses: newNotSelectedCourses,
      minNumberOfWindows,
      strategy,
    });
    if (partialResult) {
      minNumberOfWindows = getWeight(partialResult);

      result = partialResult;
    }
  }
  return result;
}

export default astar;
