import { SectionData } from "@/models/sections";
import { SubjectData } from "@/models/subjects";
import { SubjectWithSections } from "@/providers/Courses";
import { create } from "zustand";

export type CourseData = SubjectWithSections & {
  selectedSection?: SectionData;
};

type State = {
  selectedCourses: Array<CourseData | null>;
  generatedSchedules?: CourseData[][] | null;
  showGeneratedSchedule: boolean;
  selectedStrategy: string;
};

type Actions = {
  addCourse: () => void;
  removeCourse: (index: number) => void;
  selectCourse: (index: number, course: CourseData) => void;
  showSchedule: (schedule: CourseData[][]) => void;
  closeSchedule: () => void;
  changeStrategy: (strategy: string) => void;
};

export const useStore = create<State & Actions>((set) => ({
  selectedCourses: [null],
  showGeneratedSchedule: false,
  selectedStrategy: "Menos ventanas",
  addCourse: () =>
    set((state) => ({
      selectedCourses: [...state.selectedCourses, null],
    })),
  removeCourse: (index) =>
    set((state) => {
      return {
        selectedCourses: state.selectedCourses.filter((_, i) => i !== index),
      };
    }),
  selectCourse: (index, course) =>
    set((state) => {
      const selectedCourses = [...state.selectedCourses];
      selectedCourses[index] = course;
      return {
        selectedCourses,
      };
    }),
  showSchedule: (schedule) => {
    set(() => {
      return {
        generatedSchedules: schedule,
        showGeneratedSchedule: true,
      };
    });
  },
  closeSchedule: () => {
    set(() => {
      return {
        generatedSchedules: null,
        showGeneratedSchedule: false,
      };
    });
  },
  changeStrategy: (strategy) => {
    set(() => {
      return {
        selectedStrategy: strategy,
      };
    });
  },
}));
