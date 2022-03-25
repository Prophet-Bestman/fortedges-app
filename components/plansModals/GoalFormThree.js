import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import { goalFormActions, GoalFormContext } from "providers/GoalFormProvider";

const GoalFormThree = ({ setFormStep, formState, setFormState }) => {
  const { goalFormState, dispatch: setOpen } = useContext(GoalFormContext);
  const { questionThree: question } = goalFormState.goalFormQuestions;

  const planSchema = yup.object({
    targetAmount: yup.number().required().min(3),
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
    setFormState({ ...formState, amount: data.targetAmount });
  };

  const submitGoal = (data) => {
    updateFormState(data);
  };

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
          <Button w="full" ml={1} size="md" type="submit">
            Continue
          </Button>
        </Flex>
      </form>
    </Box>
  );
};

export default GoalFormThree;
