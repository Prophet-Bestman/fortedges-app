import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { GoalsPlan } from "components/plansModals";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

const Goal = ({ goal, plan, handleGoal }) => {
  const { action, img, color } = goal;

  return (
    <Box
      bgColor={color}
      onClick={() => handleGoal()}
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
      {/* <GoalsPlan
        isOpen={isGoalOpen}
        onClose={onGoalClose}
        goalProps={goalProps}
        plan={plan}
      /> */}
    </Box>
  );
};

export default Goal;
