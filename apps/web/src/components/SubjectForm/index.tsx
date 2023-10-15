"use client";
import { Subject, Section } from "contracts";
import { memo } from "react";
import { Form } from "ui";
import { useSelectedSubjects } from "@/store/selectedSubjects";
import SubjectSelect from "../SubjectSelect";
import AddSubjectButton from "../AddSubjectButton";

type SubjectFormProps = {};

const SubjectForm: React.FC<SubjectFormProps> = memo(function SubjectForm({}) {
  const { selectedSubjects } = useSelectedSubjects(({ selectedSubjects }) => ({
    selectedSubjects,
  }));
  return (
    <Form>
      {selectedSubjects.map((subject, index) => (
        <SubjectSelect key={index} selectedSubject={subject} index={index} />
      ))}
      <AddSubjectButton />
    </Form>
  );
});

export default SubjectForm;
