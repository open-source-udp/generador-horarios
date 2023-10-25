"use client";
import { Button } from "ui";
import { memo } from "react";
import { useSelectedSubjects } from "@/store/selectedSubjects";

type AddSubjectButtonProps = {};

const GenerateScheduleButton: React.FC<AddSubjectButtonProps> = memo(
  function AddSubjectButton() {
    const selectedSubjects = useSelectedSubjects("selectedSubjects");

    return (
      <Button
        type="submit"
        disabled={
          !selectedSubjects.some(
            (subject) => subject != null && subject.sectionIndex === -1
          )
        }
      >
        Generar horario
      </Button>
    );
  }
);

export default GenerateScheduleButton;
