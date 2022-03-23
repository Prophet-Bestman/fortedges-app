import { Box, Flex, Text } from "@chakra-ui/react";
import TransactionMark from "components/TransactionMark";
import React from "react";

const MiniTransaction = ({ transaction }) => {
  console.log(transaction.title);
  return (
    <Flex alignItems="" mb="32px">
      <TransactionMark status={transaction.status} />
      <Box w="full" ml="8px" mr="36px">
        <Text fontSize="14px" color="text.black" mb="4px">
          {transaction.title}
        </Text>
        <Text fontSize="13px" color="text.grey">
          {transaction.date}
        </Text>
      </Box>

      <Text flexGrow="1" ml="auto" fontSize="14px" color="text.black" mb="4px">
        {transaction.amount}
      </Text>
    </Flex>
  );
};

export default MiniTransaction;
