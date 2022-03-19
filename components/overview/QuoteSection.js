import { Box } from "@chakra-ui/react";
import { Padding } from "components/layouts";
import React from "react";
import TodaysQuote from "./TodaysQuote";

const QuoteSection = () => {
  return (
    <Box my="80px">
      <Padding>
        <TodaysQuote />
      </Padding>
    </Box>
  );
};

export default QuoteSection;
