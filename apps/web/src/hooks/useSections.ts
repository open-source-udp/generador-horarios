'use client';
import { Section } from "contracts";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { getSectionsFromSubjectCode } from "utils";

const useSections = (career: string, subjectCode?: string) => {
  const [sections, setSections] = useState<Section[]>([]);
  const { data, error, isLoading } = useSWR<Section[]>(
    `/sections/${career}.json`
  );

  useEffect(() => {
    if (data) {
      if (subjectCode) {
        setSections(getSectionsFromSubjectCode(data, subjectCode));
      } else {
        setSections(data);
      }
    }
  }, [subjectCode, data]);

  return {
    sections,
    error,
    isLoading,
  };
};

export default useSections;
