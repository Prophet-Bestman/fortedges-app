import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useContext, useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import { goalFormActions, GoalFormContext } from "providers/GoalFormProvider";
import { useCreateCustomPlan } from "api/plans";
import SuccessModal from "components/SuccessModal";
import ErrorModal from "components/ErrorModal";

const GoalFormThree = ({ setFormStep, formState, parentGaalName }) => {
  const { goalFormState } = useContext(GoalFormContext);
  const { questionThree: question } = goalFormState.goalFormQuestions;
  const [newGoal, setNewGoal] = useState({});

  const { isOpen: isSuccessOpen, onOpen: onSuccessOpen } = useDisclosure();
  const { isOpen: isErrorOpen, onOpen: onErrorOpen } = useDisclosure();

  const planSchema = yup.object({
    targetAmount: yup.number().required().min(3),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(planSchema),
  });

  const {
    mutate: createGoal,
    isLoading,
    data: createdGoal,
    error,
  } = useCreateCustomPlan();

  let payload = {
    parent_goal_name: parentGaalName,
  };

  const submitGoal = async (data) => {
    payload = { ...formState, target: data.targetAmount };
    console.log("Submitted Goal: ", payload);

    createGoal(payload);
  };

  useEffect(() => {
    if (createdGoal !== undefined) {
      if (createdGoal.toString().includes("Error")) {
        setNewGoal(createdGoal);
        onErrorOpen();
      } else onSuccessOpen();
    }
  }, [createdGoal]);

  useEffect(() => {
    if (!!error) {
      onErrorOpen();
    }
  }, [error]);

  console.log("New Goal: ", newGoal);

  return (
    <Box mt="32px">
      <form onSubmit={handleSubmit(submitGoal)}>
        <FormLabel fontWeight={600}>{question}</FormLabel>
        <InputGroup>
          <InputLeftAddon
            fontWeight={600}
            fontSize="18px"
            position="absolute"
            top="0"
            left="0"
            h="48px"
            bg="white"
          >
            $
          </InputLeftAddon>
          <Input
            pl="40px"
            type="number"
            h="48px"
            placeholder="10,000"
            mb="32px"
            // defaultValue={formState.amount}
            variant={errors.targetAmount ? "error" : "outline"}
            {...register("targetAmount")}
          />
        </InputGroup>
        <Flex>
          <Button
            onClick={() => setFormStep((prev) => prev - 1)}
            leftIcon={<IoIosArrowBack />}
            variant="ghost"
          >
            Back
          </Button>
          <Button w="full" ml={1} size="md" type="submit" isLoading={isLoading}>
            Continue
          </Button>
        </Flex>
      </form>
      <SuccessModal isOpen={isSuccessOpen} msg="Goal Creation Successful" />
      <ErrorModal isOpen={isErrorOpen} msg="Error Occurred. Try again later" />
    </Box>
  );
};

export default GoalFormThree;
