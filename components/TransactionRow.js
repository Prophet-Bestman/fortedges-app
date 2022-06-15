import { Td, Text, Tr, useDisclosure } from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import { formatter } from "utils";
import { TransactionModal } from "components/plans";

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

const TransactionRow = ({ transaction }) => {
  const { status, createdAt, type, amount, id, mode_of_payment, plan } =
    transaction;

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Tr h="60px" onClick={onOpen} cursor="pointer">
      <Td fontSize={["12px", , "14px"]}>
        {format(new Date(createdAt), "dd/MM/yyyy")}
      </Td>
      <Td textTransform="capitalize" fontSize={["12px", , "14px"]}>
        {type}
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
          bg={() => statusBg(status)}
          color={() => statusColor(status)}
          fontSize={["11px", , "12px"]}
          textAlign="center"
          w="137px"
          rounded="md"
          py="4px"
        >
          {status}
        </Text>
      </Td>
      <TransactionModal
        isOpen={isOpen}
        onClose={onClose}
        transaction={transaction}
      />
    </Tr>
  );
};

export default TransactionRow;
