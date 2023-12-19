import TextInputFieldComponent from "@/components/Common/FormFields/TextInputField";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import React, { Fragment } from "react";
import { Control, FieldValues } from "react-hook-form";

interface IntroductionFormComponentProps {
  control: Control<FieldValues, object> | any;
  index: number;
  question: any;
}

const IntroductionFormComponent = ({
  control,
  index,
  question,
}: IntroductionFormComponentProps) => {
  return (
    <Fragment>
      <Grid item xs={12}>
        <FormLabel>Description *</FormLabel>
      </Grid>
      <Grid item xs={12}>
        <TextInputFieldComponent
          id={`${index}_description`}
          name={`questions.${index}.value`}
          label=""
          defaultValue={question.value}
          control={control}
          rules={{
            required: "Please enter an description!",
          }}
          textFieldProps={{
            placeholder: "",
            multiline: true,
            rows: 5,
          }}
        />
      </Grid>
    </Fragment>
  );
};

export default IntroductionFormComponent;
