import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { formatter } from "utils";

const PlanBalance = ({ plan }) => {
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
            {!!plan && formatter.format(plan.balance)}
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
            {!!plan && formatter.format(plan.investment)}
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
          <Text color="text.green" fontSize={"13px"}>
            +{formatter.format(plan.profit)}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PlanBalance;
