import React, { useContext, useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Circle,
  Text,
  Progress,
  Box,
} from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { goalFormActions, GoalFormContext } from "providers/GoalFormProvider";
import GoalFormOne from "./GoalFormOne";
import GoalFormTwo from "./GoalFormTwo";
import GoalFormThree from "./GoalFormThree";

const SubmitGoal = () => {
  const { goalFormState, dispatch: setOpen } = useContext(GoalFormContext);
  const isOpen = goalFormState.isOpen;
  const { title } = goalFormState.goalFormQuestions;

  const [formStep, setFormStep] = useState(1);
  const [formState, setFormState] = useState({
    name: "",
    date: "",
    amount: "",
  });

  useEffect(() => {
    setFormStep((prev) => (prev = 1));
    // setFormState({
    //   name: "",
    //   date: "",
    //   amount: "",
    // });
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} isCentered size="sm">
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent py="16px">
        <ModalHeader display="flex" justifyContent="space-between">
          <Text>{title}</Text>
          <Circle
            onClick={() => {
              setFormStep((prev) => (prev = 1));
              setOpen({ type: goalFormActions.CLOSE_FORM });
            }}
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
            {formStep === 1
              ? "Question 1 of 3"
              : formStep === 2
              ? "Question 2 of 3"
              : formStep === 3
              ? "Question 3 of 3"
              : null}
          </Text>
          <Progress
            colorScheme="purple"
            value={
              formStep === 1
                ? 100 / 3
                : formStep === 2
                ? 200 / 3
                : formStep === 3
                ? 100
                : mull
            }
            size="xs"
            rounded="full"
          />

          {formStep === 1 && (
            <GoalFormOne
              formState={formState}
              setFormState={setFormState}
              setFormStep={setFormStep}
            />
          )}
          {formStep === 2 && (
            <GoalFormTwo
              formState={formState}
              setFormState={setFormState}
              setFormStep={setFormStep}
            />
          )}
          {formStep === 3 && (
            <GoalFormThree
              formState={formState}
              setFormState={setFormState}
              setFormStep={setFormStep}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubmitGoal;