import { GetStaticProps } from "next";
import { HomeProps } from "@pages/index";
import Career from "@/models/career";

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const careers = await Career.fetchAll();
  return {
    props: { careers },
  };
};
