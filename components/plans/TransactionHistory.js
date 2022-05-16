import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { transactionHistory } from "data";
import MiniTransaction from "./MiniTransaction";
import { PlanContext } from "providers/PlanProvider";
import { useGetAllMyTransactions } from "api/transactions";
import OurPortfolio from "components/plansModals/OurPortfolio";

const TransactionHistory = () => {
  const { plan } = useContext(PlanContext);
  const [transactions, setTransactions] = useState([]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: transData } = useGetAllMyTransactions(plan._id);

  useEffect(() => {
    if (transData != undefined) {
      setTransactions(transData);
    }
  }, [transData]);

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

          <Text
            display="flex"
            gap="12px"
            alignItems="center"
            fontSize="14px"
            _hover={{
              color: "app.primary",
            }}
            onClick={onOpen}
            cursor="pointer"
          >
            View Our Portfolio
            <MdKeyboardArrowRight />
          </Text>
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
      {Array.isArray(transactions.transactions) &&
        transactions?.transactions?.length > 0 && (
          <Box borderBottomWidth="0px" borderColor="#F1F2F4">
            {transactions.transactions
              ?.slice(0)
              ?.reverse()
              ?.slice(0, 4)
              ?.map((transaction) => (
                <MiniTransaction
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
          </Box>
        )}

      <OurPortfolio isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default TransactionHistory;
