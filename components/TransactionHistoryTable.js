import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Box,
  TableContainer,
} from "@chakra-ui/react";
import TransactionRow from "./TransactionRow";

const TransactionHistoryTable = ({ transactions, type }) => {
  return (
    <Box overflowX={"scroll"} pb="24px">
      <TableContainer bg="white" p="24px" pt="12" pb="32">
        <Table variant="unstyled" size="sm">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead h="60px" bg="#FAFAFA" py="24px">
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
          {transactions !== undefined &&
            transactions?.transactions?.length > 0 && (
              <Tbody>
                {transactions.transactions?.map((transaction) => (
                  <TransactionRow
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </Tbody>
            )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionHistoryTable;
