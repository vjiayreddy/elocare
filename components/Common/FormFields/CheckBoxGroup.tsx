import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBox from "@mui/material/Checkbox";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";

import Grid, { GridProps } from "@mui/material/Grid";
import React from "react";
import { Control, FieldValues, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { SxProps, Card, CardContent } from "@mui/material";
import { stringReplaceWithWhiteSpace } from "@/utils/actions";

interface CheckBoxControlGroupProps {
  id: string;
  name: string;
  rules?: any;
  error?: any;
  labelName?: string;
  defaultValues?: any;
  variant?: "IMAGE" | "CHIP" | "NORMAL" | "COLOR_BOX" | "EMOJI";
  onChange: (checkValue: any, fieldName: string) => void;
  options: any[];
  control: Control<FieldValues, object> | any;
  gridProps?: GridProps;
  gridItemProps?: GridProps;
  colorBoxSx?: SxProps;
  targetValue: string;
}

const CheckBoxControlGroup = ({
  gridProps,
  name,
  control,
  options,
  onChange,
  defaultValues,
  variant,
  labelName,
  gridItemProps,
  rules,
  targetValue,
}: CheckBoxControlGroupProps) => {
  return (
    <FormControl sx={{ width: "100%" }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValues}
        render={({ field, fieldState }) => {
          return (
            <Grid container {...gridProps}>
              {options.map((option) => (
                <Grid item {...gridItemProps} key={option._id}>
                  <FormControlLabel
                    sx={{ width: "100%", margin: 0, padding: 0 }}
                    label={variant === "NORMAL" ? option[`${labelName}`] : ""}
                    control={
                      <>
                        {variant === "NORMAL" ? (
                          <CheckBox
                            {...field}
                            //value={field.value}
                            defaultChecked={defaultValues.includes(targetValue)}
                            // checked={defaultValues?.includes(
                            //   option[targetValue]
                            // )}
                            onChange={() => {
                              field.onChange(
                                onChange(option[targetValue], name)
                              );
                            }}
                          />
                        ) : (
                          <Box sx={{ width: "100%" }}>
                            <CheckBox
                              {...field}
                              value={field.value}
                              checked={field.value?.includes(
                                option[targetValue]
                              )}
                              sx={{ width: "100%", padding: 0 }}
                              icon={
                                <Box sx={{ width: "100%" }}>
                                  {variant === "CHIP" && (
                                    <Chip
                                      color="primary"
                                      sx={{ width: "100%" }}
                                      label={option[`${labelName}`]}
                                      variant="outlined"
                                    />
                                  )}
                                  {variant === "EMOJI" && (
                                    <>
                                      <Box m={0.5}>
                                        <Card>
                                          <CardContent>
                                            <img
                                              src={`/assets/images/icons/${stringReplaceWithWhiteSpace(
                                                option[`${labelName}`],
                                                "_"
                                              )}.svg`}
                                            />
                                          </CardContent>
                                        </Card>
                                        <Box mt={1}>
                                          <Typography
                                            fontWeight={600}
                                            variant="body2"
                                            textAlign="center"
                                          >
                                            {option[`${labelName}`]}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </>
                                  )}
                                </Box>
                              }
                              checkedIcon={
                                <Box sx={{ width: "100%" }}>
                                  {variant === "CHIP" && (
                                    <Chip
                                      color="primary"
                                      sx={{ width: "100%" }}
                                      label={option[`${labelName}`]}
                                      variant="filled"
                                    />
                                  )}
                                  {variant === "EMOJI" && (
                                    <>
                                      <Box m={0.5}>
                                        <Card sx={(theme)=>({backgroundColor:theme.palette.primary.light})}>
                                          <CardContent>
                                            <img
                                              src={`/assets/images/icons/${stringReplaceWithWhiteSpace(
                                                option[`${labelName}`],
                                                "_"
                                              )}.svg`}
                                            />
                                          </CardContent>
                                        </Card>
                                        <Box mt={1}>
                                          <Typography
                                            fontWeight={600}
                                            variant="body2"
                                            textAlign="center"
                                          >
                                            {option[`${labelName}`]}
                                          </Typography>
                                        </Box>
                                      </Box>
                                    </>
                                  )}
                                </Box>
                              }
                              onChange={() => {
                                field.onChange(
                                  onChange(option[targetValue], name)
                                );
                              }}
                            />
                          </Box>
                        )}
                      </>
                    }
                  />
                </Grid>
              ))}
              {!!fieldState?.error && (
                <FormHelperText sx={{ marginLeft: 0 }} error={true}>
                  {fieldState?.error?.message}
                </FormHelperText>
              )}
            </Grid>
          );
        }}
      />
    </FormControl>
  );
};

export default CheckBoxControlGroup;
