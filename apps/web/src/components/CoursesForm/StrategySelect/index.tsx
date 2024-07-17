import { memo } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useStore } from "@/store";

export const options = [
  "Menos ventanas",
  "Priorizar secciones en la mañana",
  "Priorizar secciones en la tarde",
];

const StrategySelect: React.FC = memo(function StrategySelect() {
  const { selectedStrategy, changeStrategy, isDisabled } = useStore(
    (store) => ({
      selectedStrategy: store.selectedStrategy,
      changeStrategy: store.changeStrategy,
      isDisabled: store.selectedCourses
        .filter((c) => c)
        .every((c) => c.selectedSection?.code),
    })
  );
  return (
    <FormControl>
      <InputLabel id="strategy-select">Preferencia</InputLabel>
      <Select
        disabled={isDisabled}
        label="Preferencia"
        sx={{ marginBottom: "40px" }}
        labelId="strategy-select"
        value={selectedStrategy}
        onChange={(e) => changeStrategy(e.target.value as string)}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
export default StrategySelect;
