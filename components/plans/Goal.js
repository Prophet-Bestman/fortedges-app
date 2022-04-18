import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { GoalsPlan } from "components/plansModals";
import { goalModalProps } from "data";
import React, { useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";

const Goal = ({ goal }) => {
  const { action, img, color } = goal;
  const [goalProps, setGoalProps] = useState(goalModalProps.fixedIncome);

  const {
    isOpen: isGoalOpen,
    onClose: onGoalClose,
    onOpen: onGoalOpen,
  } = useDisclosure();

  const handleGoal = (goalAction) => {
    switch (goalAction) {
      case goalModalProps.ownYourHome.title:
        setGoalProps(goalModalProps.ownYourHome);
        break;
      case goalModalProps.planWedding.title:
        setGoalProps(goalModalProps.planWedding);
        break;
      case goalModalProps.saveForRent.title:
        setGoalProps(goalModalProps.saveForRent);
        break;
      case goalModalProps.saveForSchool.title:
        setGoalProps(goalModalProps.saveForSchool);
        break;
      case goalModalProps.startBusiness.title:
        setGoalProps(goalModalProps.startBusiness);
        break;
      case goalModalProps.travel.title:
        setGoalProps(goalModalProps.travel);
        break;

      default:
        setGoalProps(goalModalProps.fixedIncome);
        break;
    }

    onGoalOpen();
  };

  return (
    <Box
      bgColor={color}
      onClick={() => handleGoal(action)}
      bgRepeat="no-repeat"
      cursor="pointer"
      w="full"
      maxW={"150px"}
      h="195px"
      p="16px"
      display="flex"
      flexDir="column"
      justifyContent="center"
      borderRadius="12px"
      bgGradient="linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, rgba(196, 196, 196, 0) 0.01%, rgba(0, 0, 0, 0.4) 100%)"
      position="relative"
    >
      <Flex justifyContent="center" alignItems="center" h="100%">
        <Image src={img} objectPosition="center" w={["60px"]} />
      </Flex>
      <Box
        textAlign="center"
        color="white"
        display="flex"
        alignItems="center"
        gap="4px"
      >
        <Text fontSize={"13px"}>{action}</Text>
        <BsArrowRightShort />
      </Box>
      <GoalsPlan
        isOpen={isGoalOpen}
        onClose={onGoalClose}
        goalProps={goalProps}
        plan={goal}
      />
    </Box>
  );
};

export default Goal;
