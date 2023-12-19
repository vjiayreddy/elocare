import AutoCompleteInputFiled from "@/components/Common/FormFields/AutoCompleteField";
import TextInputFieldComponent from "@/components/Common/FormFields/TextInputField";
import { QUESTION_TYPES_OPTIONS } from "@/utils/constants";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import React, { Fragment } from "react";
import { Control, FieldValues } from "react-hook-form";

interface VoiceFormComponentProps {
  control: Control<FieldValues, object> | any;
  index: number;
  question: any;
}

const VoiceFormComponent = ({
  control,
  index,
  question,
}: VoiceFormComponentProps) => {
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
      <Grid item xs={12}>
        <AutoCompleteInputFiled
          control={control}
          rules={{
            required: "Select atleast one member",
          }}
          isEqualValue="value"
          targetValue="label"
          id="response-type"
          name={`questions.${index}.responseType`}
          options={QUESTION_TYPES_OPTIONS || []}
          multiple={true}
          defaultValues={question?.responseType}
        />
      </Grid>
    </Fragment>
  );
};

export default VoiceFormComponent;
