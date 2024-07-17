import { TimeBlockData } from "@/models/sections";
import { CourseData } from "@/store";
import getTimeblocksFromCourses from "./getTimeblocksFromCoursesData";

export default function timeBlocksDontOverlap(
  timeBlocksOrCourses: TimeBlockData[] | Array<CourseData>
): boolean {
  let timeBlocks: TimeBlockData[];
  if (timeBlocksOrCourses[0]?.hasOwnProperty("selectedSection")) {
    timeBlocks = getTimeblocksFromCourses(
      timeBlocksOrCourses as Array<CourseData>
    );
  } else {
    timeBlocks = timeBlocksOrCourses as TimeBlockData[];
  }

  const usedTimeBlocks = new Set<string>();
  for (const timeBlock of timeBlocks) {
    const key = `${timeBlock.day}-${timeBlock.block}`;
    if (usedTimeBlocks.has(key)) {
      return false;
    }
    usedTimeBlocks.add(key);
  }
  return true;
}
