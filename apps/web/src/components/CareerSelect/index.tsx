"use client";
import { memo } from "react";
import { Select } from "ui";
import { useRouter } from "next/navigation";

export type CareerSelectProps = {
  careers: string[];
  defaultCareer?: string;
};

const CareerSelect: React.FC<CareerSelectProps> = memo(function CareerSelect({
  careers,
  defaultCareer = "",
}) {
  const router = useRouter();
  return (
    <Select
      onChange={(e, option) => {
        if (option.value) {
          router.push(`/${option.value}`);
        }
      }}
      options={careers.map((career) => ({
        label: career,
        value: career,
      }))}
      placeholder={"Selecciona una carrera"}
      label={"Carrera"}
    />
  );
});

export default CareerSelect;
