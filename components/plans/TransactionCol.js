import { Box } from "@chakra-ui/react";
import React from "react";
import AccountSummary from "./AccountSummary";
import TransactionActions from "./TransactionActions";
import TransactionHistory from "./TransactionHistory";

const TransactionCol = () => {
  return (
    <Box>
      <TransactionActions />
      <TransactionHistory />
      <AccountSummary />
    </Box>
  );
};

export default TransactionCol;
