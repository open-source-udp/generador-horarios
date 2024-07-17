import { SectionData } from "@/models/sections";
import { SubjectData } from "@/models/subjects";
import { memo, createContext, useContext } from "react";
import useSWR from "swr";
import useSections from "./useSections";

export type SubjectWithSections = SubjectData & {
  sections: Array<SectionData>;
};

export type Courses = {
  subjects: Array<SubjectWithSections>;
  career: string;
  sectionsAreLoading: boolean;
};

export const defaultCourses: Courses = {
  subjects: [],
  career: null,
  sectionsAreLoading: false,
};

export const CoursesContext = createContext<Courses>(defaultCourses);

export const useCourses = () => useContext(CoursesContext);
const fetcher = (url) => fetch(url).then((res) => res.json());

const CoursesProvider = ({ children, career, subjects }) => {
  const { data, isLoading } = useSections(career);

  const subjectsWithSections = subjects.map((subject) => {
    let sections = [];
    if (global.window && !isLoading) {
      sections = data.filter((section) => section.subjectCode === subject.code);
    }
    return { ...subject, sections };
  });

  return (
    <CoursesContext.Provider
      value={{
        career,
        subjects: subjectsWithSections,
        sectionsAreLoading: isLoading,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export default CoursesProvider;
