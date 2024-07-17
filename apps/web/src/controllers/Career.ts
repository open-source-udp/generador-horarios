import { GetServerSideProps } from "next";
import { CareerProps } from "@pages/[career]";
import Subject from "@/models/subjects";
import Career from "@/models/career";

export const getServerSideProps: GetServerSideProps<CareerProps> = async (
  context
) => {
  const { career } = context.params;
  const careers = await Career.fetchAll();

  if (!careers.includes(career as string)) {
    return {
      notFound: true,
    };
  }

  const [subjects] = await Promise.all([Subject.fetchAll(career as string)]);

  return {
    props: {
      career: career as string,
      subjects: subjects,
    },
  };
};
