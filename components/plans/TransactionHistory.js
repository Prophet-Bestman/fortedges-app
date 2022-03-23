import { Box, Flex, Text } from "@chakra-ui/react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import React from "react";
import { transactionHistory } from "data";
import MiniTransaction from "./MiniTransaction";

const TransactionHistory = () => {
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
        <Link href="#">
          <Text
            textDecor="underline"
            fontSize="16px"
            _hover={{
              color: "app.primary",
            }}
          >
            See All
          </Text>
        </Link>
      </Flex>

      {/* Transaction History */}
      <Box borderBottomWidth="0px" borderColor="#F1F2F4">
        {transactionHistory.slice(0, 3).map((transaction, i) => (
          <MiniTransaction key={i} transaction={transaction} />
        ))}
      </Box>

      {/* Graph */}

      {/* Account Balnce details */}
    </Box>
  );
};

export default TransactionHistory;
