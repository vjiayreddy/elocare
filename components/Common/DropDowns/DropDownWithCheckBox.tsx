import React from "react";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { StyledDropDownWithCheckBoxComponent } from "./styled";

interface DropDownWithCheckBoxComponentProps {
  options: any[];
  id: string;
  placeholder?: string;
  selectProps?: SelectProps;
}
const DropDownWithCheckBoxComponent = ({
  options,
  id,
  placeholder,
}: DropDownWithCheckBoxComponentProps) => {
  const [personName, setPersonName] = React.useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <StyledDropDownWithCheckBoxComponent>
      <Select
        style={{ height: 40 }}
        fullWidth={true}
        labelId=""
        displayEmpty
        id={id}
        value={personName}
        onChange={handleChange}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span>{placeholder}</span>;
          }
          return selected.join(", ");
        }}
        MenuProps={{
          PaperProps: {
            elevation: 1,
            style: {},
          },
        }}
      >
        {options.map((name) => (
          <MenuItem  key={name} value={name}>
            <Checkbox checked={personName.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </StyledDropDownWithCheckBoxComponent>
  );
};

export default DropDownWithCheckBoxComponent;
