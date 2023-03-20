import { Box, Circle, Flex, Text } from "@chakra-ui/react";
import { PlanContext } from "providers/PlanProvider";
import React, { useContext, useState, useEffect } from "react";
import { formatter } from "utils";

const PlanBalance = () => {
  const { plan } = useContext(PlanContext);

  const [total_investment, settotal_investment] = useState(0);
  const [profit, setProfit] = useState(0);
  const [investment, setInvestment] = useState(0);

  useEffect(() => {
    if (plan !== undefined) {
      setProfit(plan.profit);
      settotal_investment(plan.total_investment);
      setInvestment(plan.investment);
    }
  }, [plan]);

  const balance = investment + profit;

  let percentageProfit = 0;

  if (total_investment !== 0) {
    percentageProfit = (profit / balance) * 100;
  }

  return (
    <Box my="24px">
      <Flex
        justify={["center", , "space-between"]}
        alignItems={["center", , "center"]}
        flexDir={["column", , "row"]}
      >
        <Box my="12px">
          <Text
            fontSize={"14px"}
            color="text.grey"
            mb="4px"
            textAlign={["center", , "start"]}
          >
            Plan Balance
          </Text>
          <Text color="text.black" fontSize={"24px"} fontWeight="600">
            {!!balance && balance !== NaN ? formatter.format(balance) : "$0.00"}
          </Text>
        </Box>
        <Box my="12px" display={["none", , "block"]}>
          <Text
            fontSize={"14px"}
            color="text.grey"
            mb="4px"
            textAlign={["center", , "start"]}
          >
            Deposit Value
          </Text>
          <Text color="text.black" fontSize={"24px"} fontWeight="600">
            {!!investment && investment !== NaN
              ? formatter.format(investment)
              : "$0.00"}
          </Text>
        </Box>
        <Box my="12px">
          <Text
            fontSize={"12px"}
            color="text.grey"
            mb="4px"
            textAlign={["center", , "start"]}
          >
            Profits
          </Text>
          <Flex gap="8px" alignItems="center">
            <Text color="text.light_green" fontSize={"14px"}>
              +{formatter.format(plan.profit)}
            </Text>
            <Circle bg="text.light_green" size="5px"></Circle>
            <Text color="text.light_green" fontSize={"14px"}>
              +{percentageProfit.toFixed(3)}%
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Flex justify="center">
        <Text
          fontSize={"12px"}
          color="text.grey"
          py="6px"
          px="4"
          textAlign="center"
          bg="#F2F3F5"
          rounded="full"
          my="4"
          w="fit-content"
        >
          Return are updated every weekday
        </Text>
      </Flex>
    </Box>
  );
};

export default PlanBalance;
