"use client";
import { Subject } from "contracts";
import useSWR from "swr";

const useSubjects = (career: string) => {
  const { data, error, isLoading } = useSWR<Subject[]>(
    `/subjects/${career}.json`
  );
  // TODO: add subjects of CFGS

  return {
    subjects: data || [],
    error,
    isLoading,
  };
};

export default useSubjects;
