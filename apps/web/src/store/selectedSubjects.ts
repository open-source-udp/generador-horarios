import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SelectedSubject = {
  subjectCode?: string;
  sectionCode?: string;
};

type State = {
  selectedSubjects: Array<SelectedSubject | null>;
};

type Actions = {
  add: (subject: SelectedSubject) => void;
  remove: (subject: SelectedSubject) => void;
  update: (index: number, subject: SelectedSubject) => void;
  clear: () => void;
};

export const useSelectedSubjects = create(
  persist<State & Actions>(
    (set) => ({
      selectedSubjects: [null],
      add: (subject) =>
        set(({ selectedSubjects }) => ({
          selectedSubjects: [...selectedSubjects, subject],
        })),
      remove: (subject) =>
        set(({ selectedSubjects }) => ({
          selectedSubjects: selectedSubjects.filter(
            (s) => s.subjectCode !== subject.subjectCode
          ),
        })),
      update: (index, subject) =>
        set(({ selectedSubjects }) => ({
          selectedSubjects: selectedSubjects.map((s, i) =>
            i === index ? subject : s
          ),
        })),
      clear: () =>
        set(() => ({
          selectedSubjects: [null],
        })),
    }),
    {
      name: "selected-subjects",
    }
  )
);
