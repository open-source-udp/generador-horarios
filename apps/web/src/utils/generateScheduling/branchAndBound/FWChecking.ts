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
  const numberOfWindows = getWeight(alreadySelectedCourses);
  if (
    numberOfWindows >= minNumberOfWindows && // if the number of windows is already greater than the minimum reached we can stop
    alreadySelectedCourses.length > 1 // if there are overlapping time blocks
  ) {
    return null; // if the number of windows is already greater than the minimum reached we can stop
  } else if (!notSelectedCourses.length) {
    return alreadySelectedCourses; // if we have a new minimum, return the result
  }

  let result = null;
  for (const course of notSelectedCourses) {
    const possibleSections = course.sections.filter(
      // FW checking
      (section) =>
        !alreadySelectedCourses.some(
          (alreadySelectedCourse) =>
            alreadySelectedCourse.selectedSection.code === section.code
        ) &&
        timeBlocksDontOverlap([
          ...alreadySelectedCourses,
          { ...course, selectedSection: section },
        ]) &&
        (getWeight([
          ...alreadySelectedCourses,
          { ...course, selectedSection: section },
        ]) < minNumberOfWindows ||
          alreadySelectedCourses.length === 0)
    );

    for (const section of possibleSections) {
      const newAlreadySelectedCourses = [
        ...alreadySelectedCourses,
        { ...course, selectedSection: section },
      ];
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
