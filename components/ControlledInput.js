import React from "react";
import { Controller } from "react-hook-form";
import {
  Input as ChakraInput,
  Textarea,
  PinInput,
  PinInputField,
  Select,
  Input,
} from "@chakra-ui/react";

const ControlledInput = ({
  control,
  name,
  inputType,
  type,
  defaultValue,
  children = <></>,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          {inputType === "pin-input" && (
            <PinInput value={value} onChange={onChange} size="lg" {...props}>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          )}
          {inputType === "input" && (
            <Input onChange={onChange} value={value} type={type} {...props} />
          )}
          {inputType === "textarea" && (
            <Textarea
              onChange={onChange}
              value={value}
              type={type}
              {...props}
              defaultValue={defaultValue}
            />
          )}
          {inputType === "select" && (
            <Select
              defaultValue={defaultValue}
              onChange={onChange}
              value={value}
              {...props}
            >
              {children}
            </Select>
          )}
        </>
      )}
    />
  );
};

export default ControlledInput;
