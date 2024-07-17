import { CourseData } from "@/store";
import timeBlocksDontOverlap from "../../timeBlocksDontOverlap";
import { generateSchedulingParams } from "..";
import { strategies } from "..";

export function branchAndBound({
  alreadySelectedCourses,
  notSelectedCourses,
  minNumberOfWindows = Number.MAX_SAFE_INTEGER,
  strategy,
}: generateSchedulingParams & { minNumberOfWindows?: number }):
  | CourseData[]
  | null {
  const getWeight = strategies[strategy];
  // const numberOfWindows = getWeight(alreadySelectedCourses);
  if (!notSelectedCourses.length) {
    return alreadySelectedCourses; // if we have a new minimum, return the result
  }

  let result = null;
  for (const course of notSelectedCourses) {
    for (const section of course.sections) {
      const newAlreadySelectedCourses = [
        ...alreadySelectedCourses,
        { ...course, selectedSection: section },
      ];
      const numberOfWindows = getWeight(newAlreadySelectedCourses);
      if (
        !timeBlocksDontOverlap(newAlreadySelectedCourses) ||
        (numberOfWindows >= minNumberOfWindows &&
          newAlreadySelectedCourses.length > 1)
      ) {
        continue;
      }
      const newNotSelectedCourses = notSelectedCourses.filter(
        (notSelectedCourse) => notSelectedCourse.code !== course.code
      );

      const partialResult = branchAndBound({
        alreadySelectedCourses: newAlreadySelectedCourses,
        notSelectedCourses: newNotSelectedCourses,
        minNumberOfWindows,
        strategy,
      });
      if (partialResult) {
        minNumberOfWindows = getWeight(partialResult);
        result = partialResult;
      }
    }
  }
  return result;
}

export default branchAndBound;
