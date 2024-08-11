import { SectionData } from "@/models/sections";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const CFG_FOLDER = "FORMACION-GENERAL";

export const CFG_FILES = [
  "CFG-DEPORTIVOS.json",
  "FORMACION-GENERAL.json",
  "INGLES-GENERAL.json",
];

const useSections = (career: string) => {
  const data = [];
  const { data: careerSections, isLoading } = useSWR<Array<SectionData>>(
    `/sections/${career}.json`,
    fetcher
  );
  if (careerSections) {
    data.push(...careerSections);
  }
  for (const cfgFile of CFG_FILES) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data: cfgSections } = useSWR<Array<SectionData>>(
      `/sections/${CFG_FOLDER}/${cfgFile}`,
      fetcher
    );
    if (cfgSections) {
      data.push(...cfgSections);
    }
  }
  return { data, isLoading };
};

export default useSections;
