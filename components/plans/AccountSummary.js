import { Box, Flex, Text } from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import React from "react";
import { formatter } from "utils";

const AccountSummary = ({ plan }) => {
  return (
    <Box fontWeight="14px">
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Total Earnings</Text>
        <Text color="text.black">{formatter.format(plan.balance)}</Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Last Earnings</Text>
        <Text color="text.black">{formatter.format(plan.profit)}</Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Deposit Value</Text>
        <Text color="text.black">{formatter.format(plan.investment)}</Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Total Withdrawals</Text>
        <Text color="text.black">$2,000.00</Text>
      </Flex>
      <Flex
        justify="space-between"
        py="24px"
        borderBottomWidth="1px"
        borderColor="#F1F2F4"
      >
        <Text color="text.grey">Plan created on</Text>
        <Text color="text.black">
          {/* {plan.createdAt} */}
          {formatDistance(new Date(plan.createdAt), new Date(), {
            addSuffix: true,
          })}
        </Text>
      </Flex>
    </Box>
  );
};

export default AccountSummary;
