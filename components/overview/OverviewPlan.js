import { Box, Flex, Image, Tag, Text } from "@chakra-ui/react";
import { planProps } from "data";
import { goalProps } from "data/explorePlans";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatter } from "utils";

const OverviewPlan = ({ plan }) => {
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
            setCurrentPlanProps(planProps.cryptoPremium);
            break;

          case "Cryptocurrency Intermediate":
            setCurrentPlanProps(planProps.cryptoIntermediate);
            break;

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
    <Link href={`/myplans/${plan._id}`}>
      <Box
        bgColor={currentPlanProps?.color}
        cursor="pointer"
        bgRepeat="no-repeat"
        w="full"
        maxW={["full", "327px"]}
        h="196px"
        p="16px"
        // display="flex"
        // justifyContent="center"
        borderRadius="12px"
        // alignItems='center'
        position="relative"
        _before={{
          content: "''",
          bgGradient:
            "linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, rgba(196, 196, 196, 0) 0.01%, rgba(0, 0, 0, 0.4) 100%)",
          position: "absolute",
          borderRadius: "12px",
          top: 0,
          left: 0,
          h: "100%",
          w: "100%",
        }}
      >
        <Image mb="3" src={currentPlanProps?.img} w="90px" />

        <Box bottom="14px" position="absolute" color="white">
          <Text mb="4px" fontSize="13px">
            {name}
          </Text>

          <Flex gap="3" alignItems="center">
            <Text mb="4px" fontSize="15px" fontWeight={600}>
              {formatter.format(investment + profit)}
            </Text>

            <Tag
              variant="subtle"
              color="white"
              rounded="full"
              bg="#ffffff22"
              size="sm"
              px="3"
            >
              Profit
            </Tag>
          </Flex>
          {/* <Text mb="4px" fontSize="13px">
            {parent_plan_name}
          </Text> */}
        </Box>
      </Box>
    </Link>
  );
};

export default OverviewPlan;
