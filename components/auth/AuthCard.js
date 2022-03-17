import { Box } from "@chakra-ui/react";
import React from "react";

const AuthCard = ({ children }) => {
  return (
    <Box
      bg="white"
      p="24px"
      my="24px"
      borderRadius="12px"
      boxShadow="0px 0px 40px rgba(0, 0, 0, 0.15)"
      w="full"
      maxW="484px"
    >
      {children}
    </Box>
  );
};

export default AuthCard;
