import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
  Text,
} from "@chakra-ui/react";
import { transactionHistory } from "data";

const TransactionHistoryTable = () => {
  return (
    <Box overflowX={"scroll"} pb="24px">
      <Table variant="unstyled">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead bg="#FAFAFA">
          <Tr>
            <Th
              fontWeight={400}
              fontSize="12px"
              color="text.grey"
              fontFamily="DM Sans"
            >
              Time
            </Th>
            <Th
              fontWeight={400}
              fontSize="12px"
              color="text.grey"
              fontFamily="DM Sans"
            >
              Type
            </Th>
            <Th
              fontWeight={400}
              fontSize="12px"
              color="text.grey"
              fontFamily="DM Sans"
            >
              Plan
            </Th>
            <Th
              fontWeight={400}
              fontSize="12px"
              color="text.grey"
              fontFamily="DM Sans"
            >
              Amount
            </Th>
            <Th
              fontWeight={400}
              fontSize="12px"
              color="text.grey"
              fontFamily="DM Sans"
            >
              Transaction Ref
            </Th>
            <Th
              fontWeight={400}
              fontSize="12px"
              color="text.grey"
              fontFamily="DM Sans"
            >
              Mode of payment
            </Th>
            <Th
              fontWeight={400}
              fontSize="12px"
              color="text.grey"
              fontFamily="DM Sans"
            >
              Status
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactionHistory.map((transaction) => (
            <Tr>
              <Td fontSize={["12px", , "14px"]}>{transaction.time}</Td>
              <Td fontSize={["12px", , "14px"]}>{transaction.type}</Td>
              <Td fontSize={["12px", , "14px"]}>{transaction.plan}</Td>
              <Td fontSize={["12px", , "14px"]}>{transaction.amount}</Td>
              <Td fontSize={["12px", , "14px"]}>
                {transaction.transactionRef}
              </Td>
              <Td fontSize={["12px", , "14px"]}>{transaction.modeOfPayment}</Td>
              <Td>
                <Text
                  bg={
                    transaction.status === "Success" ? "green.50" : "#E9C46A33"
                  }
                  color={
                    transaction.status === "Success" ? "green.400" : "#E9C46A"
                  }
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
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default TransactionHistoryTable;
