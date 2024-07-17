import { useCourses } from "@/providers/Courses";
import { useEffect } from "react";
import { useStore } from "@/store";
import { SectionSelectProps } from ".";
import getTimeblocksFromCoursesData from "@/utils/getTimeblocksFromCoursesData";
import timeBlocksDontOverlap from "@/utils/timeBlocksDontOverlap";
import { SectionData } from "@/models/sections";

export const AUTO_SECTION = {
  section: "Auto",
  code: "",
  subjectCode: "",
  timeBlocks: [],
};

const useSectionSelect = (
  course: SectionSelectProps["course"],
  selectedCoursesIndex: SectionSelectProps["selectedCoursesIndex"]
) => {
  const courses = useCourses();
  const selectCourse = useStore((store) => store.selectCourse);
  const selectedCourses = useStore((store) => store.selectedCourses);
  useEffect(() => {
    if (course && !course.selectedSection) {
      selectCourse(selectedCoursesIndex, {
        ...course,
        selectedSection: AUTO_SECTION,
      });
    }
  }, [course]);

  const getOptionDisabled = (option) => {
    if (option === AUTO_SECTION) {
      return false;
    }

    return !timeBlocksDontOverlap([
      ...getTimeblocksFromCoursesData(
        selectedCourses.slice(0, selectedCoursesIndex)
      ),
      ...option.timeBlocks.reduce((acc, timeBlock) => {
        if (
          !acc.find(
            (tb) => tb.day === timeBlock.day && tb.block === timeBlock.block
          )
        ) {
          return acc.concat(timeBlock);
        }
        return acc;
      }, []),
      ...getTimeblocksFromCoursesData(
        selectedCourses.slice(selectedCoursesIndex + 1)
      ),
    ]);
  };

  const onChange = (_, value: SectionData) => {
    if (value) {
      selectCourse(selectedCoursesIndex, {
        ...course,
        selectedSection: value,
      });
    } else {
      selectCourse(selectedCoursesIndex, {
        ...course,
        selectedSection: AUTO_SECTION,
      });
    }
  };

  return {
    sections: course?.sections ? [AUTO_SECTION, ...course?.sections] : [],
    sectionsAreLoading: courses.sectionsAreLoading,
    getOptionDisabled,
    onChange,
  };
};

export default useSectionSelect;
