import React, { useContext, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Flex,
  Image,
  Box,
  Circle,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { goalSteps } from "data";
import { goalFormActions, GoalFormContext } from "providers/GoalFormProvider";
import SubmitGoal from "./SubmitGoal";

const GoalsPlan = ({ isOpen, onClose, goalProps, goal }) => {
  const { title, text, color, icon } = goalProps;
  const { dispatch: setOpen } = useContext(GoalFormContext);
  const { dispatch: setparentGoalName } = useContext(GoalFormContext);

  useEffect(() => {
    if (isOpen) setOpen({ type: goalFormActions, payload: goalProps.title });
  }, [goalProps, isOpen]);

  return (
    <Modal isOpen={isOpen} size="full">
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent py="30px" color="text.black" maxW="400px">
        <ModalHeader alignItems="center" display="flex">
          <AiOutlineArrowLeft
            style={{
              cursor: "pointer",
            }}
            onClick={onClose}
          />
          <Text fontSize="24px" fontWeight={500} mx="auto">
            {title}
          </Text>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Text
            py="12px"
            px="24px"
            color="text.grey"
            textAlign="center"
            fontSize="14px"
            mb="16px"
          >
            {text}
          </Text>

          <Flex justify="center" fontSize="14px">
            <Text mb="40px" color="text.grey">
              Range -{" "}
            </Text>
            <Text> $2,000 - $4,000</Text>
          </Flex>

          <Flex justify="center">
            <Circle size="96px" bg={color}>
              <Image w="48px" src={icon} />
            </Circle>
          </Flex>

          {/* Steps */}
          <Box color="text.black" mt="40px" mb="90px">
            {goalSteps.map((goal) => (
              <Flex key={goal.title} mb="32px">
                <Circle mr="12px" size="40px" bg="#F1F2F4">
                  <Image src={goal.icon} />
                </Circle>

                <Box>
                  <Text fontWeight={600} fontSize="14px" mb="8px">
                    {goal.title}
                  </Text>
                  <Text color="text.grey" fontSize="13px">
                    {goal.text}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            w="full"
            onClick={() => {
              // onClose();
              setOpen({
                type: goalFormActions.OPEN_FORM,
              });
              setparentGoalName({
                type: goalFormActions.SET_PARENT_GOAL_NAME,
                payload: goalProps.title,
              });
            }}
          >
            Get Started
          </Button>
        </ModalFooter>
      </ModalContent>
      <SubmitGoal goal={goal} />
    </Modal>
  );
};

export default GoalsPlan;
