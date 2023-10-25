"use client";

import { Autocomplete, Chip, TextField } from "@mui/material";
import { memo } from "react";

type Option = { value: string | number; label: string };

export type SelectProps = {
  options: Array<Option>;
  onChange: (
    e: React.SyntheticEvent<Element, Event>,
    value: Option | null
  ) => void;
  defaultValue?: Option;
  placeholder: string;
  label: string;
  getOptionDisabled?: (option: Option) => boolean;
};

const Select: React.FC<SelectProps> = memo(function Select({
  options = [],
  onChange: handleChange,
  defaultValue,
  placeholder,
  label,
  getOptionDisabled
}) {
  return (
    <Autocomplete
      options={options}
      onChange={handleChange}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.value}>
            {option.label}
          </li>
        );
      }}
      renderTags={(tagValue, getTagProps) => {
        return tagValue.map((option, index) =>
          option ? (
            <Chip
              {...getTagProps({ index })}
              key={option.value}
              label={option.label}
            />
          ) : null
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} placeholder={placeholder} />
      )}
      value={defaultValue}
      getOptionLabel={(option) => option?.label}
      isOptionEqualToValue={(option, value) => option?.value === value?.value}
      getOptionDisabled={getOptionDisabled}
      loadingText={"Cargando..."}
    />
  );
});

export default Select;
