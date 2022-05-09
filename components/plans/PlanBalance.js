import { Box, Circle, Flex, Text } from "@chakra-ui/react";
import { PlanContext } from "providers/PlanProvider";
import React, { useContext } from "react";
import { formatter } from "utils";

const PlanBalance = () => {
  const { plan } = useContext(PlanContext);

  const [investment, setInvestment] = React.useState();
  const [profit, setProfit] = React.useState();

  React.useEffect(() => {
    if (plan !== undefined) {
      setProfit(plan.profit);
      setInvestment(plan.investment);
    }
  }, [plan]);

  const balance = investment + profit;

  let percentageProfit = 0;

  if (investment !== 0) {
    percentageProfit = (profit / balance) * 100;
  }

  return (
    <Box my="24px">
      <Text
        fontSize={"12px"}
        color="text.grey"
        py="6px"
        textAlign="center"
        bg="#F2F3F5"
        rounded="full"
      >
        Return are updated every weekday
      </Text>

      <Flex
        justify={["center", , "space-between"]}
        alignItems={["center", , "center"]}
        flexDir={["column", , "row"]}
        my="40px"
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
            Total Deposit
          </Text>
          <Text color="text.black" fontSize={"24px"} fontWeight="600">
            {!!profit && profit !== NaN
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
            <Text color="text.green" fontSize={"14px"}>
              +{formatter.format(plan.profit)}
            </Text>
            <Circle bg="text.green" size="5px"></Circle>
            <Text color="text.green" fontSize={"14px"}>
              +{percentageProfit.toFixed(3)}%
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default PlanBalance;
