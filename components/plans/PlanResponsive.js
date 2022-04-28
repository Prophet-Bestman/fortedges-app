import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { GoalsPlan, PremiumPlan, RealEstatePlan } from "components/plansModals";
import { goalModalProps, planProps } from "data";
import React, { useState, useEffect } from "react";

const PlanResponsive = ({ plan, userID }) => {
  const { name, returnType, _id } = plan;
  const [currentPlanProps, setCurrentPlanProps] = useState();
  const [goalProps, setGoalProps] = useState(goalModalProps.fixedIncome);

  const {
    isOpen: isPremiumOpen,
    onClose: onPremiumClose,
    onOpen: onPremiumOpen,
  } = useDisclosure();
  const {
    isOpen: isRealEstateOpen,
    onClose: onRealEstateClose,
    onOpen: onRealEstateOpen,
  } = useDisclosure();

  const {
    isOpen: isGoalOpen,
    onClose: onGoalClose,
    onOpen: onGoalOpen,
  } = useDisclosure();

  useEffect(() => {
    if (plan !== undefined) {
      switch (plan.name) {
        case "Fixed Income":
          setCurrentPlanProps(planProps.fixedIncome);
          setGoalProps(goalModalProps.fixedIncome);
          break;
        case "Real Estate":
          setCurrentPlanProps(planProps.realEstate);
          break;
        case "Premium Stock":
          setCurrentPlanProps(planProps.premiumStock);
          break;

        default:
          break;
      }
    }
  }, [plan]);

  const handlePlan = () => {
    if (name === "Premium Stock") {
      onPremiumOpen();
    } else if (name === "Real Estate") {
      onRealEstateOpen();
    } else onGoalOpen();
  };

  return (
    <Box
      bgColor={currentPlanProps?.color}
      bgRepeat="no-repeat"
      w="full"
      maxW={["170", "200", , "280", "327px"]}
      h={["195", "220", , "260", "280px"]}
      p="16px"
      onClick={handlePlan}
      display="flex"
      flexDir="column"
      justifyContent="center"
      borderRadius="12px"
      bgGradient="linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, rgba(196, 196, 196, 0) 0.01%, rgba(0, 0, 0, 0.4) 100%)"
      position="relative"
    >
      <Flex justifyContent="center" alignItems="center" h="100%">
        <Image
          src={currentPlanProps?.img}
          objectPosition="center"
          w={["60px", , , "auto"]}
        />
      </Flex>
      <Box textAlign="center" color="white">
        <Text fontSize="15px" fontWeight="600" mb="4px">
          {name}
        </Text>
        <Text fontSize={"13px"}>{returnType}</Text>
      </Box>

      <PremiumPlan
        isOpen={isPremiumOpen}
        onClose={onPremiumClose}
        plan={plan}
        userID={userID}
      />
      <RealEstatePlan
        isOpen={isRealEstateOpen}
        onClose={onRealEstateClose}
        plan={plan}
        userID={userID}
      />
      <GoalsPlan
        isOpen={isGoalOpen}
        onClose={onGoalClose}
        goalProps={goalProps}
        plan={plan}
        id={_id}
        userID={userID}
      />
    </Box>
  );
};

export default PlanResponsive;
