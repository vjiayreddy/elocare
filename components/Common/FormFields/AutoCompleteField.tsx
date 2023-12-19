import React, { Fragment } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

interface AutoCompleteControlProps {
  id: string;
  name: string;
  rules?: any;
  error?: any;
  label?: string;
  targetValue?: string;
  isEqualValue: string;
  defaultValues?: any;
  options: any[];
  control: Control<FieldValues, object> | any;
  size?: "small" | "medium";
  onChange?: (data: any) => void;
  multiple?: boolean;
  readOnly?: boolean;
}

const AutoCompleteInputFiled = ({
  id,
  name,
  control,
  rules,
  defaultValues,
  isEqualValue,
  targetValue,
  options,
  onChange,
  size,
  multiple,
  readOnly,
}: AutoCompleteControlProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValues || null}
      rules={rules}
      render={({ field, fieldState }) => (
        <Fragment>
          <Autocomplete
            id={id}
            size={size}
            readOnly={readOnly}
            options={options}
            multiple={multiple}
            filterSelectedOptions
            getOptionLabel={(option) => {
              if (typeof option === "string") {
                return option;
              }
              return option.label || option[`${targetValue}`];
            }}
            isOptionEqualToValue={(option, value) =>
              option[isEqualValue] === value[isEqualValue]
            }
            onChange={(_, data) => {
              field.onChange(data);
              onChange?.(data);
            }}
            renderTags={(options, getTagProps) => {
              return options.map((option, index: number) => (
                <Chip
                  {...getTagProps({
                    index: index,
                  })}
                  key={option._id}
                  label={option[targetValue as string]}
                  variant="outlined"
                />
              ));
            }}
            renderOption={(props, option) => (
              <ListItem {...props} key={option?._id} alignItems="flex-start">
                <ListItemText
                  primary={option[targetValue as string]}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {option?.gender}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                error={!!fieldState?.error}
                label=""
                placeholder="Select Response Type"
              />
            )}
            value={field.value}
          />
          {fieldState?.error && (
            <FormHelperText error>{fieldState.error.message}</FormHelperText>
          )}
        </Fragment>
      )}
    ></Controller>
  );
};

export default AutoCompleteInputFiled;
