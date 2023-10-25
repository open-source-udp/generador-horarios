"use client";
import { useSections, useSubjects } from "@/hooks";
import { memo } from "react";
import { Select } from "ui";
import { SelectedSubject, useSelectedSubjects, useSyncSelectedSubjects } from "@/store/selectedSubjects";
import { useParams } from "next/navigation";
import { Subject, Section } from "contracts";
import Grid from "@mui/material/Unstable_Grid2";
import Delete from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { getSectionsFromSubjectCode, timeBlocksDontOverlap } from "utils";

type SubjectSelectProps = {
  index: number;
  selectedSubject: SelectedSubject;
};
const AUTO_SECTION = {
  label: "Auto",
  value: -1,
};

const SubjectSelect: React.FC<SubjectSelectProps> = memo(
  function SubjectSelect({ selectedSubject, index }) {
    const params = useParams();
    const { subjects, isLoading } = useSubjects(params?.career as string);
    const { sections } = useSections(
      params?.career as string,
      subjects[selectedSubject?.subjectIndex]?.code
    );
    const { sections: allSections } = useSections(params?.career as string);
    const selectedSubjects = useSelectedSubjects("selectedSubjects");

    // const { update, selectedSubjects, remove } = useSelectedSubjects(
    //   ({ update, selectedSubjects, remove }) => ({
    //     update,
    //     selectedSubjects,
    //     remove,
    //   })
    // );
    const { update, remove } = useSyncSelectedSubjects()

    let currentSubject: Subject | null = null;
    let currentSection: Section | null = null;
    if (!isLoading && subjects) {
      currentSubject = subjects[selectedSubject?.subjectIndex] || null;
      currentSection = sections[selectedSubject?.sectionIndex] || null;
    }

    return (
      <Grid container>
        <Grid lg={6}>
          <Select
            label="Ramo"
            defaultValue={
              currentSubject
                ? {
                    label: currentSubject.name,
                    value: selectedSubject.subjectIndex,
                  }
                : null
            }
            onChange={(e, newValue) => {
              if (!newValue) {
                update(index, {
                  subjectIndex: -1,
                  sectionIndex: -1,
                });
                return;
              }
              update(index, {
                subjectIndex: newValue.value as number,
                sectionIndex: -1,
              });
            }}
            options={subjects?.map((subject, subjectIndex) => ({
              label: subject.name,
              value: subjectIndex,
            }))}
            placeholder="Selecciona un ramo"
            getOptionDisabled={(option) =>
              selectedSubjects.some(
                (selectedSubject) =>
                  selectedSubject?.subjectIndex === option.value
              )
            }
          />
        </Grid>
        <Grid lg={5}>
          <Select
            label="Sección"
            onChange={(e, newValue) => {
              if (!newValue) {
                update(index, {
                  subjectIndex: selectedSubject.subjectIndex,
                  sectionIndex: -1,
                });
                return;
              }
              update(index, {
                subjectIndex: selectedSubject.subjectIndex,
                sectionIndex: newValue.value as number,
              });
            }}
            options={[
              AUTO_SECTION,
              ...sections?.map((section, i) => ({
                label: section.section,
                value: i,
              })),
            ]}
            defaultValue={
              currentSubject &&
              (currentSection
                ? {
                    value: selectedSubject.sectionIndex,
                    label: currentSection.section,
                  }
                : AUTO_SECTION)
            }
            placeholder="Agrega una sección"
            getOptionDisabled={(option) => {
              if (option.value === null || option.value === -1) {
                return false;
              }
              const selectedSections = selectedSubjects.map((subject) => {
                if (!subject) return null;
                const { subjectIndex, sectionIndex } = subject;
                const subjectCode = subjects[subjectIndex]?.code;
                const sections = getSectionsFromSubjectCode(
                  allSections,
                  subjectCode
                );
                if (selectedSubject.subjectIndex === subjectIndex)
                  return {
                    timeBlocks: [],
                  } as Section;
                return sections[sectionIndex];
              });
              const selectedTimeBlocks = selectedSections.flatMap((section) =>
                section ? section.timeBlocks : []
              );
              const newSection = sections[option.value];
              const newTimeBlocks = newSection.timeBlocks;
              const timeBlocks = [...selectedTimeBlocks, ...newTimeBlocks];
              return !timeBlocksDontOverlap(timeBlocks);
            }}
          />
        </Grid>
        <Grid
          lg={1}
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
        >
          <IconButton onClick={() => remove(index)}>
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
);

export default SubjectSelect;
