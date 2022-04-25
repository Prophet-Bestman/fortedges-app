import { Box, Flex, Text } from "@chakra-ui/react";
import TransactionMark from "components/TransactionMark";
import { format } from "date-fns";
import React from "react";
import { formatter } from "utils";

const statusBg = (status) => {
  if (status === "processing") return "#E9C46A33";
  else if (status === "successful") return "green.100";
  else return "red.100";
};
const statusColor = (status) => {
  if (status === "processing") return "#E9C46A";
  else if (status === "successful") return "green.400";
  else return "red.400";
};

const MiniTransaction = ({ transaction }) => {
  return (
    <Flex alignItems="" mb="16px" py="16px" px="12px">
      <TransactionMark status={transaction.status} />
      <Box w="full" mr="36px" ml="6px">
        <Text
          fontSize="16px"
          color="text.black"
          mb="4px"
          textTransform={"capitalize"}
        >
          <strong>{transaction.type}</strong>,{" "}
          <small>{transaction.plan.name}</small>
        </Text>
        <Text fontSize="13px" color="text.grey">
          {!!transaction.createdAt &&
            format(new Date(transaction.createdAt), "dd/MM/yyyy")}
        </Text>
      </Box>

      <Text flexGrow="1" ml="auto" fontSize="14px" color="text.black" mb="4px">
        {formatter.format(transaction.amount)}
      </Text>
    </Flex>
  );
};

export default MiniTransaction;
