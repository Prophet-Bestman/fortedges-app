import { Box, Button, Flex, FormLabel, Input } from "@chakra-ui/react";
import React, { useContext } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import { goalFormActions, GoalFormContext } from "providers/GoalFormProvider";

const GoalFormOne = ({ setFormStep, formState, setFormState }) => {
  const { goalFormState, dispatch: setOpen } = useContext(GoalFormContext);
  const { questionOne: question } = goalFormState.goalFormQuestions;

  // const id = goalFormState.id;

  const planSchema = yup.object({
    goalName: yup.string().required().min(3),
  });

  const onClose = () => {
    setOpen({ type: goalFormActions.CLOSE_FORM });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(planSchema),
  });

  const updateFormState = (data) => {
    setFormState({ ...formState, name: data.goalName });
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
          type="text"
          h="48px"
          placeholder="E.g Itanian Cuisine"
          mb="32px"
          defaultValue={formState.name}
          variant={errors.goalName ? "error" : "outline"}
          {...register("goalName")}
        />
        <Flex>
          <Button
            onClick={onClose}
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

export default GoalFormOne;
