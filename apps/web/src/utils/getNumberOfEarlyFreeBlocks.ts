import { CourseData } from "@/store";
import { DAYS } from "@/components/Timetable";

function getNumberOfEarlyFreeBlocks(coursesData: CourseData[]) {
  const timeBlocks = coursesData.flatMap(
    (course) => course.selectedSection.timeBlocks
  );

  let totalFreeBlocks = 0;
  for (const day of DAYS) {
    const dayTimeBlocks = timeBlocks
      .filter((timeBlock) => timeBlock.day === day)
      .sort((a, b) => a.block.localeCompare(b.block));

    while (dayTimeBlocks.length >= 1) {
      const timeBlock = dayTimeBlocks.shift();
      const earlyFreeBlocks = timeBlock.block.charCodeAt(0) - 65; // 65 is the ascii code for 'A'
      totalFreeBlocks += earlyFreeBlocks;
    }
  }
  return totalFreeBlocks;
}

export default getNumberOfEarlyFreeBlocks;
