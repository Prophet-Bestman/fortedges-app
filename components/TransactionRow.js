import { Td, Text, Tr } from "@chakra-ui/react";
import { useGetSingleCustomPlan } from "api/plans";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { formatter } from "utils";

const TransactionRow = ({ transaction }) => {
  const { is_complete, status, createdAt, type, amount, id, mode_of_payment } =
    transaction;
  const [plan, setPlan] = useState();
  const { data: planData } = useGetSingleCustomPlan(transaction.plan);

  useEffect(() => {
    if (planData !== undefined) {
      setPlan(planData);
    }
  }, [planData]);

  console.log(transaction);
  return (
    <Tr h="60px">
      <Td fontSize={["12px", , "14px"]}>
        {format(new Date(createdAt), "dd/MM/yyyy")}
      </Td>
      <Td textTransform="capitalize" fontSize={["12px", , "14px"]}>
        {transaction.type}
      </Td>
      <Td fontSize={["12px", , "14px"]}>{!!plan ? plan.name : ""}</Td>
      <Td fontSize={["12px", , "14px"]}>{formatter.format(amount)}</Td>
      <Td fontSize={["12px", , "14px"]}>{id}</Td>
      <Td textTransform="uppercase" fontSize={["12px", , "14px"]}>
        {mode_of_payment}
      </Td>
      <Td>
        <Text
          textTransform={"capitalize"}
          bg={transaction.status === "Success" ? "green.50" : "#E9C46A33"}
          color={transaction.status === "Success" ? "green.400" : "#E9C46A"}
          fontSize={["11px", , "12px"]}
          //   w="full"
          textAlign="center"
          w="137px"
          rounded="md"
          py="4px"
        >
          {transaction.status}
        </Text>
      </Td>
    </Tr>
  );
};

export default TransactionRow;
