"use client";
import { useSections, useSubjects } from "@/hooks";
import { memo } from "react";
import { Select } from "ui";
import { SelectedSubject, useSelectedSubjects } from "@/store/selectedSubjects";
import { useParams } from "next/navigation";
import { Subject, Section } from "contracts";
import Grid from "@mui/material/Unstable_Grid2";
import Delete from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

type SubjectSelectProps = {
  index: number;
  selectedSubject: SelectedSubject;
};
const AUTO_SECTION = {
  label: "Auto",
  value: null,
};

const SubjectSelect: React.FC<SubjectSelectProps> = memo(
  function SubjectSelect({ selectedSubject, index }) {
    const params = useParams();
    const { subjects, isLoading } = useSubjects(params?.career as string);
    const { sections } = useSections(
      params?.career as string,
      selectedSubject?.subjectCode
    );

    const { update, clear } = useSelectedSubjects(({ update, clear }) => ({
      update,
      clear,
    }));

    let currentSubject: Subject | null = null;
    let currentSection: Section | null = null;
    if (!isLoading && subjects) {
      currentSubject = subjects.find(
        (subject) => subject.code === selectedSubject?.subjectCode
      );
      currentSection = sections.find(
        (section) => section.code === selectedSubject?.sectionCode
      );
      if (selectedSubject?.sectionCode && !currentSubject) {
        clear();
      }
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
                    value: currentSubject.code,
                  }
                : null
            }
            onChange={(e, newValue) => {
              if (!newValue) {
                update(index, {
                  subjectCode: undefined,
                  sectionCode: undefined,
                });
                return;
              }
              update(index, {
                subjectCode: newValue.value,
                sectionCode: undefined,
              });
            }}
            options={subjects?.map((subject) => ({
              label: subject.name,
              value: subject.code,
            }))}
            placeholder="Selecciona un ramo"
          />
        </Grid>
        <Grid lg={5}>
          <Select
            label="Sección"
            onChange={(e, newValue) => {
              if (!newValue) {
                update(index, {
                  subjectCode: currentSubject?.code,
                  sectionCode: undefined,
                });
                return;
              }
              update(index, {
                subjectCode: currentSubject?.code,
                sectionCode: newValue.value,
              });
            }}
            options={[
              AUTO_SECTION,
              ...sections?.map((section) => ({
                label: section.section,
                value: section.code,
              })),
            ]}
            defaultValue={
              currentSubject &&
              (currentSection
                ? {
                    value: currentSection.code,
                    label: currentSection.section,
                  }
                : AUTO_SECTION)
            }
            placeholder="Agrega una sección"
          />
        </Grid>
        <Grid
          lg={1}
          alignItems={"center"}
          justifyContent={"center"}
          display={"flex"}
        >
          <IconButton>
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
);

export default SubjectSelect;
