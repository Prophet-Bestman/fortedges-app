import React, { useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Circle,
  Text,
  Progress,
  Box,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { goalFormActions, GoalFormContext } from "providers/GoalFormProvider";

const SubmitGoal = () => {
  const { goalFormState, dispatch: setOpen } = useContext(GoalFormContext);
  const isOpen = goalFormState.isOpen;

  const planSchema = yup.object({
    planName: yup.string().required().min(3),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(planSchema),
  });

  const onClose = () => {
    setOpen({ type: goalFormActions.CLOSE_FORM });
  };

  const submitGoal = (data) => {
    console.log(data);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} isCentered size="sm">
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent py="16px">
        <ModalHeader display="flex" justifyContent="space-between">
          <Text>Name Your Plan</Text>
          <Circle
            onClick={() => setOpen({ type: goalFormActions.CLOSE_FORM })}
            cursor="pointer"
            size="40px"
            bg="#F1F2F4"
            _hover={{
              bg: "#e1e1e3",
            }}
          >
            <AiOutlineClose fontSize="14px" />
          </Circle>
        </ModalHeader>

        <ModalBody>
          <Text fontSize={"13px"} color="text.grey">
            Question 1 of 1
          </Text>
          <Progress colorScheme="purple" value={100} size="xs" rounded="full" />

          <Box mt="32px">
            <form onSubmit={handleSubmit(submitGoal)}>
              <FormLabel fontWeight={600}>Give your plan a name</FormLabel>
              <Input
                type="text"
                h="48px"
                placeholder="E.g Itanian Cuisine"
                mb="32px"
                variant={errors.planName ? "error" : "outline"}
                {...register("planName")}
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubmitGoal;
