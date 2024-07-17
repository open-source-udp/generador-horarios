import { CourseData } from "@/store";
import { DAYS } from "@/components/Timetable";

function getWindowsFromCoursesData(coursesData: CourseData[]) {
  let numberOfWindows = 0;
  const timeBlocks = coursesData.flatMap(
    (course) => course.selectedSection.timeBlocks
  );

  for (const day of DAYS) {
    const dayTimeBlocks = timeBlocks
      .filter((timeBlock) => timeBlock.day === day)
      .sort((a, b) => a.block.localeCompare(b.block));

    if (dayTimeBlocks.length === 0) {
      // TODO: check if this is a good idea
      // numberOfWindows += 5; // penalty for having only one class in a day
      numberOfWindows -= 3; // reward for having no classes in a day
      continue;
    }

    while (dayTimeBlocks.length > 1) {
      const timeBlock = dayTimeBlocks.shift();
      const nextTimeBlock = dayTimeBlocks[0];
      const asciiDiff =
        nextTimeBlock.block.charCodeAt(0) - timeBlock.block.charCodeAt(0);
      numberOfWindows += asciiDiff - 1;
    }
  }
  return numberOfWindows;
}

export default getWindowsFromCoursesData;
