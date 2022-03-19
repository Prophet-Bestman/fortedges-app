import { Box } from "@chakra-ui/react";
import React from "react";

const Padding = ({ children }) => {
  return <Box px={["24px", "42px", "48px", , "64px"]}>{children}</Box>;
};

export default Padding;
