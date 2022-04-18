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
import { getLocalWallet, getParentPlanID } from "api/config.js";

const planID = getParentPlanID();

const SubmitGoal = ({ id }) => {
  const { goalFormState, dispatch: setOpen } = useContext(GoalFormContext);
  const isOpen = goalFormState.isOpen;
  const { title } = goalFormState.goalFormQuestions;
  // const [parentPlan, setParentPlan] = useState("");

  const [formStep, setFormStep] = useState(1);
  const [wallet, setWallet] = useState("");
  const [formState, setFormState] = useState({
    type: "goal",
    description: "",
    parent_plan_id: planID,
  });

  useEffect(() => {
    const localWallet = getLocalWallet();
    setWallet(localWallet._id);
  }, []);

  useEffect(() => {
    setFormState({
      ...formState,
      wallet_id: wallet,
    });
  }, [wallet]);

  useEffect(() => {
    setFormStep((prev) => (prev = 1));
  }, [isOpen]);

  console.log("Goal form: ", goalFormState);
  console.log("Form State: ", formState);

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
              // parentGoalName={parentPlan}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubmitGoal;
