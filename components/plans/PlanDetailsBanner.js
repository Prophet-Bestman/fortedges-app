import { Box, Image, Text } from "@chakra-ui/react";
import { goalProps, planProps } from "data/explorePlans";
import { PlanContext } from "providers/PlanProvider";
import React, { useContext, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

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
          case "Cryptocurrency Premium":
            setCurrentPlanProps(planProps.cryptoBasic);

          case "Cryptocurrency Intermediate":
            setCurrentPlanProps(planProps.cryptoBasic);

          case "Cryptocurrency Basic":
            setCurrentPlanProps(planProps.cryptoBasic);
            break;

          default:
            break;
        }
      }
    }
  }, [plan]);

  return (
    <Box
      h="90px"
      bg={currentPlanProps.color}
      bgGradient="linear-gradient(178.73deg, rgba(196, 196, 196, 0) 1.08%, rgba(196, 196, 196, 0) 1.09%, rgba(0, 0, 0, 0.4) 98.92%)"
      position="relative"
    >
      <Image
        pos="absolute"
        right="8"
        h="full"
        filter={"blur(0.4px)"}
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
        // justifyContent={"center"}
        alignItems="center"
        px="3"
        gap="6"
      >
        <BiArrowBack color="white" fontSize="24px" />
        <Box color="white">
          {!!plan && (
            <Text fontSize="20px" fontWeight={500}>
              {/* {plan.parent_plan_name} */}
              My Plan
            </Text>
          )}
          {!!plan && <Text fontSize="14px">{plan.parent_plan_name}</Text>}
        </Box>
      </Box>
    </Box>
  );
};

export default PlanDetailsBanner;
