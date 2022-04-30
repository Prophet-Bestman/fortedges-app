import { Box, Image, Text } from "@chakra-ui/react";
import { goalProps, planProps } from "data/explorePlans";
import { PlanContext } from "providers/PlanProvider";
import React, { useContext, useEffect, useState } from "react";

const PlanDetailsBanner = () => {
  const { plan } = useContext(PlanContext);
  const { investment, name, profit, parent_plan_name, parent_goal_name } = plan;
  const [currentPlanProps, setCurrentPlanProps] = useState({});

  useEffect(() => {
    if (plan !== undefined) {
      if (!!parent_goal_name) {
        switch (parent_goal_name) {
          case "Start a Business":
            setCurrentPlanProps(goalProps.business);
            break;
          case "Save for School":
            setCurrentPlanProps(goalProps.school);
            break;
          case "Travel":
            setCurrentPlanProps(goalProps.travel);
            break;
          case "Own your own Home":
            setCurrentPlanProps(goalProps.home);
            break;
          case "Save for Rent":
            setCurrentPlanProps(goalProps.rent);
            break;
          case "Plan a wedding":
            setCurrentPlanProps(goalProps.wedding);
            break;
          default:
            setCurrentPlanProps(planProps.fixedIncome);
            break;
        }
      } else {
        switch (parent_plan_name) {
          case "Fixed Income":
            setCurrentPlanProps(planProps.fixedIncome);
            break;
          case "Real Estate":
            setCurrentPlanProps(planProps.realEstate);
            break;
          case "Premium Stock":
            setCurrentPlanProps(planProps.premiumStock);
            break;
        }
      }
    }
  }, [plan]);

  return (
    <Box
      h="120px"
      bg={currentPlanProps.color}
      bgGradient="linear-gradient(178.73deg, rgba(196, 196, 196, 0) 1.08%, rgba(196, 196, 196, 0) 1.09%, rgba(0, 0, 0, 0.4) 98.92%)"
      position="relative"
    >
      <Image
        h="full"
        ml="140px"
        filter={"blur(3px)"}
        src={currentPlanProps.img}
        alt=""
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        display="flex"
        justifyContent={"center"}
        alignItems="center"
      >
        <Box color="white" textAlign="center">
          {!!plan && (
            <Text fontSize="20px" fontWeight={500}>
              {plan.name}
            </Text>
          )}
          {!!plan && <Text fontSize="14px">{plan.parent_plan_name}</Text>}
        </Box>
      </Box>
    </Box>
  );
};

export default PlanDetailsBanner;
