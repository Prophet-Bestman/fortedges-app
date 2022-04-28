import { Box, Button, Flex, FormLabel, Input } from "@chakra-ui/react";
import React, { useContext, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import { goalFormActions, GoalFormContext } from "providers/GoalFormProvider";
import DatePicker from "react-datepicker";

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

const GoalFormTwo = ({ setFormStep, formState, setFormState }) => {
  const { goalFormState } = useContext(GoalFormContext);
  const { questionTwo: question } = goalFormState.goalFormQuestions;

  const planSchema = yup.object({
    goalDate: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(planSchema),
  });

  const updateFormState = (data) => {
    setFormState({
      ...formState,
      data: {
        ...formState.data,
        duration: {
          from: formatDate(new Date()),
          to: data.goalDate,
        },
      },
    });
  };

  const submitGoal = (data) => {
    updateFormState(data);
    setFormStep((prev) => prev + 1);
  };

  return (
    <Box mt="32px">
      <form onSubmit={handleSubmit(submitGoal)}>
        <FormLabel fontWeight={600}>{question}</FormLabel>
        <Input
          h="48px"
          placeholder="E.g Itanian Cuisine"
          mb="32px"
          variant={errors.goalDate ? "error" : "outline"}
          {...register("goalDate")}
          type="date"
        />

        <Flex>
          <Button
            onClick={() => setFormStep((prev) => prev - 1)}
            leftIcon={<IoIosArrowBack />}
            variant="ghost"
          >
            Back
          </Button>
          <Button w="full" ml={1} size="md" type="submit">
            Continue
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default GoalFormTwo;
