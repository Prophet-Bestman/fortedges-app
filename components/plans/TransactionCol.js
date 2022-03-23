import { Box, Button, Circle, Flex } from "@chakra-ui/react";
import React from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import AccountSummary from "./AccountSummary";
import TransactionActions from "./TransactionActions";
import TransactionHistory from "./TransactionHistory";

const TransactionCol = () => {
  return (
    <Box>
      {/* Display on desktop */}
      <TransactionActions />
      <TransactionHistory />
      <AccountSummary />
    </Box>
  );
};

export default TransactionCol;