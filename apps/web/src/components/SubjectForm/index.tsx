"use client";
import { memo } from "react";
import { Form } from "ui";
import { useSelectedSubjects } from "@/store/selectedSubjects";
import SubjectSelect from "../SubjectSelect";
import AddSubjectButton from "../AddSubjectButton";
import GenerateScheduleButton from "../GenerateScheduleButton";
import { useParams, useRouter } from "next/navigation";
import { useSubjects, useSections } from "@/hooks";
import {
  getSectionsFromSubjectCode,
  generateScheduling,
  AlreadySelectedSubject,
  NotSelectedSubject,
} from "utils";

type SubjectFormProps = {};

const SubjectForm: React.FC<SubjectFormProps> = memo(function SubjectForm({}) {
  const params = useParams();
  const router = useRouter();
  const { subjects, isLoading } = useSubjects(params?.career as string);
  const selectedSubjects = useSelectedSubjects("selectedSubjects");
  const { sections } = useSections(params?.career as string);

  const readyForSchedulingSubjects = selectedSubjects.filter(s => s).map((subject) => {
    const subjectInfo = subjects[subject.subjectIndex];
    const possibleSections = getSectionsFromSubjectCode(
      sections,
      subjectInfo.code
    );
    if (possibleSections[subject.sectionIndex])
      return {
        subjectInfo,
        sectionInfo: possibleSections[subject.sectionIndex],
      };
    return { subjectInfo, possibleSections };
  });

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        const schedule = generateScheduling({
          alreadySelectedSubjects: readyForSchedulingSubjects.filter(
            (subject) => subject.sectionInfo
          ) as AlreadySelectedSubject[],
          notSelectedSubjects: readyForSchedulingSubjects.filter(
            (subject) => !subject.sectionInfo
          ) as NotSelectedSubject[],
        });
        console.log(schedule);
        const base64Schedule = btoa(JSON.stringify(schedule));
        router.push(`/horario/${base64Schedule}`)
      }}
    >
      {selectedSubjects.map((subject, index) => (
        <SubjectSelect key={index} selectedSubject={subject} index={index} />
      ))}
      <AddSubjectButton />
      <GenerateScheduleButton />
    </Form>
  );
});

export default SubjectForm;
