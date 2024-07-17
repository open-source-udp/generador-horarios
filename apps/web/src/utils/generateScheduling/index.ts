import { CourseData } from "@/store";
import getWindowsFromCoursesData from "../getWindowsFromCoursesData";
import getNumberOfEarlyFreeBlocks from "../getNumberOfEarlyFreeBlocks";

export type generateSchedulingParams = {
  alreadySelectedCourses: CourseData[];
  notSelectedCourses: CourseData[];
  strategy:
    | "Menos ventanas"
    | "Priorizar secciones en la mañana"
    | "Priorizar secciones en la tarde";
};

export const strategies = {
  "Menos ventanas": getWindowsFromCoursesData,
  "Priorizar secciones en la mañana": getNumberOfEarlyFreeBlocks,
  "Priorizar secciones en la tarde": (data) =>
    -getNumberOfEarlyFreeBlocks(data),
};

// export { default as astar, default as default } from "./astar";
export { default as dfs, default as default } from "./dfs";
// export {
//   default as branchAndBound,
//   default as default,
// } from "./branchAndBound";
