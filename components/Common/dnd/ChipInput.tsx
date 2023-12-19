import React from "react";
import { useController } from "react-hook-form";

interface ParentInputProps {
  control: any;
  name: any;
}

const ParentInput = ({ control, name }: ParentInputProps) => {
  const {
    field: { onChange, name: controllerName, value, ref },
  } = useController({
    control,
    name,
  });

  return (
    <input
      type="number"
      name={controllerName}
      defaultValue={value}
      onChange={onChange}
    />
  );
};

export default ParentInput;
