import { Box } from "@chakra-ui/react";
import React from "react";
import AccountSummary from "./AccountSummary";
import TransactionActions from "./TransactionActions";
import TransactionHistory from "./TransactionHistory";

const TransactionCol = () => {
  return (
    <Box px={["24px", "42px", "0", ,]}>
      <TransactionActions />
      <Box display={[, , , "none"]}>
        <TransactionHistory />
      </Box>
      <AccountSummary />
    </Box>
  );
};

export default TransactionCol;
