import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";

export type SelectedSubject = null | {
  subjectIndex?: number;
  sectionIndex?: number;
};

type State = {
  selectedSubjects: Array<SelectedSubject>;
};

type Actions = {
  add: (subject: SelectedSubject) => void;
  remove: (index: number) => void;
  update: (index: number, subject: SelectedSubject) => void;
  clear: () => void;
};

export const useSyncSelectedSubjects = create(
  persist<State & Actions>(
    (set) => ({
      selectedSubjects: [null],
      add: (subject) =>
        set(({ selectedSubjects }) => ({
          selectedSubjects: [...selectedSubjects, subject],
        })),
      remove: (index) =>
        set(({ selectedSubjects }) => ({
          selectedSubjects: selectedSubjects
            .slice(0, index)
            .concat(selectedSubjects.slice(index + 1)),
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

type GetFunctionKeys<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => void ? K : never;
}[keyof T];

type OmittedFunctionKeys<T> = Omit<T, GetFunctionKeys<T>>;

export const useSelectedSubjects = <
  T extends keyof OmittedFunctionKeys<Actions & State>
>(
  key: T
): OmittedFunctionKeys<Actions & State>[T] => {
  const [state, setState] = useState([]);
  const zustandState = useSyncSelectedSubjects(
    (persistedState) => persistedState[key]
  );

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
