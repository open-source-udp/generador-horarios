import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useRouter } from "next/router";
import { FC, memo } from "react";

export type CareerSelectProps = { careers: Array<string> };

const CareerSelect: FC<CareerSelectProps> = memo(function CareerSelect({
  careers,
}) {
  const router = useRouter();
  return (
    <FormControl sx={{ width: "100%", color: "red" }}>
      <InputLabel id="career-select">Carrera</InputLabel>
      <Select
        defaultValue=""
        labelId="career-select"
        onChange={(e) => router.push(`/${e.target.value}`)}
        placeholder={"Selecciona una carrera"}
        label={"Carrera"}
      >
        {careers.map((career) => (
          <MenuItem key={career} value={career}>
            {career}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

export default CareerSelect;
