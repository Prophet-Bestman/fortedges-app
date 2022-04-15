import { Box, Flex, Text } from "@chakra-ui/react";
import { useGetSingleCustomPlan } from "api/plans";
import TransactionMark from "components/TransactionMark";
import { format, formatDistance } from "date-fns";
import React, { useEffect, useState } from "react";
import { formatter } from "utils";

const MiniTransaction = ({ transaction }) => {
  const [plan, setPlan] = useState();
  const { data: planData } = useGetSingleCustomPlan(transaction.plan);

  useEffect(() => {
    if (planData !== undefined) {
      setPlan(planData);
    }
  }, [planData]);

  return (
    <Flex alignItems="" mb="16px" py="16px" px="12px">
      <TransactionMark status={transaction.is_complete} />
      <Box w="full" mr="36px" ml="6px">
        <Text
          fontSize="16px"
          color="text.black"
          mb="4px"
          textTransform={"capitalize"}
        >
          <strong>{transaction.type}</strong>,{" "}
          <small>{!!plan && plan?.name}</small>
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
