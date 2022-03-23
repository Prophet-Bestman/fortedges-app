import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const AccountSummary = () => {
  return (
    <Box fontWeight="14px">
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Total Earnings</Text>
        <Text color="text.blaxk">$2,000.00</Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Last Earnings</Text>
        <Text color="text.blaxk">$2,000.00</Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Deposit Value</Text>
        <Text color="text.blaxk">$2,000.00</Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Total Withdrawals</Text>
        <Text color="text.blaxk">$2,000.00</Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Plan created on</Text>
        <Text color="text.blaxk">05 January 2020</Text>
      </Flex>
    </Box>
  );
};

export default AccountSummary;
