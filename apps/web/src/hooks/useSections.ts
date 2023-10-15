import { Section } from "contracts";
import useSWR from "swr";
import { useEffect, useState } from "react";

export function getNumberFromString(str: string) {
  const matches = str.match(/\d+/g);
  if (matches) {
    return parseInt(matches[0]);
  }
  return 0;
}

const useSections = (career: string, subjectCode?: string) => {
  const [sections, setSections] = useState<Section[]>([]);
  const { data, error, isLoading } = useSWR<Section[]>(
    `/sections/${career}.json`
  );

  useEffect(() => {
    if (subjectCode && data) {
      setSections(
        data
          .filter((section) => section.subjectCode === subjectCode)
          .sort((a, b) => {
            return (
              getNumberFromString(a.section) - getNumberFromString(b.section)
            );
          })
      );
    }
  }, [subjectCode, data]);

  return {
    sections,
    error,
    isLoading,
  };
};

export default useSections;
