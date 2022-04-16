import { Box, Flex, Text } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { transactionHistory } from "data";
import MiniTransaction from "./MiniTransaction";
import { PlanContext } from "providers/PlanProvider";
import { useGetAllMyTransactions } from "api/transactions";

const TransactionHistory = () => {
  const { plan } = useContext(PlanContext);
  const [transactions, setTransactions] = useState([]);

  const [error, setError] = React.useState("");

  console.log("plan:", plan);

  const { data: transData, error: transError } = useGetAllMyTransactions(
    plan._id
  );

  useEffect(() => {
    if (transData != undefined) {
      setTransactions(transData);
    }
  }, [transData]);
  useEffect(() => {
    if (transError != undefined) {
      setError(transError);
    }
  }, [transError]);

  console.log("Transactions: ", transactions);
  console.log("Error: ", error);

  return (
    <Box mt="32px" borderBottomWidth="1px" borderColor="#F1F2F4" pb="24px">
      <Box
        display={["block", , "none"]}
        py="12px"
        borderColor={"#F1F2F4"}
        borderTopWidth="1px"
        borderBottomWidth="1px"
        mb="32px"
      >
        <Flex justify="space-between" alignItems="center">
          <Text fontSize={"14px"} color="text.grey">
            {"What’s this plan made of?"}
          </Text>

          <Link href="#">
            <Text
              display="flex"
              gap="12px"
              alignItems="center"
              fontSize="14px"
              _hover={{
                color: "app.primary",
              }}
            >
              View Portfolio
              <MdKeyboardArrowRight />
            </Text>
          </Link>
        </Flex>
      </Box>
      <Flex color="text.black" justifyContent={"space-between"} mb="32px">
        <Text fontSize="18px">Recent Transactions</Text>
        <Link href="/transaction_history">
          <Text
            textDecor="underline"
            fontSize="16px"
            _hover={{
              color: "app.primary",
            }}
            cursor="pointer"
          >
            See All
          </Text>
        </Link>
      </Flex>

      {/* Transaction History */}
      {Array.isArray(transactions.transactions) && (
        <Box borderBottomWidth="0px" borderColor="#F1F2F4">
          {transactions.transactions
            ?.slice(0)
            ?.reverse()
            ?.slice(0, 4)
            ?.map((transaction) => (
              <MiniTransaction key={transaction.id} transaction={transaction} />
            ))}
        </Box>
      )}

      {/* Graph */}

      {/* Account Balnce details */}
    </Box>
  );
};

export default TransactionHistory;
