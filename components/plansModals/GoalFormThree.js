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
import ErrorModal from "components/ErrorModal";
import PlanCreated from "./PlanCreated";

const GoalFormThree = ({ setFormStep, formState, onParentClose }) => {
  const { goalFormState } = useContext(GoalFormContext);
  const { questionThree: question } = goalFormState.goalFormQuestions;
  const [newGoal, setNewGoal] = useState({});

  const {
    isOpen: isSuccessOpen,
    onClose: onSuccessClose,
    onOpen: onSuccessOpen,
  } = useDisclosure();
  const {
    isOpen: isErrorOpen,
    onClose: onErrorClose,
    onOpen: onErrorOpen,
  } = useDisclosure();

  const closeParent = () => {
    onSuccessClose();
    onErrorClose();
    onParentClose();
  };

  const planSchema = yup.object({
    targetAmount: yup.number().required().min(0),
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
    // parent_goal_name: parentGaalName,
  };

  const submitGoal = (data) => {
    payload = {
      ...formState,
      data: { ...formState.data, target: data.targetAmount, type: "goal" },
    };
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
      {!!createdGoal && createdGoal?.data && (
        <PlanCreated
          isOpen={isSuccessOpen}
          msg="Plan Creation Successful"
          closeParent={closeParent}
          plan={createdGoal?.data}
        />
      )}
      <ErrorModal
        isOpen={isErrorOpen}
        msg="Error Occurred. Try again later"
        closeParent={closeParent}
      />
    </Box>
  );
};

export default GoalFormThree;
