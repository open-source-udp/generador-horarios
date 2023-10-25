"use client";
import { Timetable as UITimetable } from "ui";
import { memo } from "react";
import { useSelectedSubjects } from "@/store/selectedSubjects";
import { useSections, useSubjects } from "@/hooks";
import { getSectionsFromSubjectCode } from "utils";
import { useParams } from "next/navigation";

export const Timetable: React.FC = memo(function Timetable() {
  const params = useParams();
  const { subjects, isLoading } = useSubjects(params?.career as string);
  const selectedSubjects = useSelectedSubjects("selectedSubjects");
  const { sections } = useSections(params?.career as string);

  const timeBlocks = selectedSubjects.flatMap((selectedSubject) => {
    if (!isLoading && subjects && sections) {
      const subject = subjects[selectedSubject?.subjectIndex];
      let section = null;
      if (subject) {
        section = getSectionsFromSubjectCode(sections, subject.code)[
          selectedSubject?.sectionIndex
        ];
      }
      if (!section) {
        return [];
      }
      return section?.timeBlocks?.map((timeBlock) => ({
        ...timeBlock,
        subjectName: subject.name,
        sectionName: section.section,
      }));
    }
    return [];
  });

  return <UITimetable timeBlocks={timeBlocks} />;
});
