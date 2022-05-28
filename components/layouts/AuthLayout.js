import { Box } from "@chakra-ui/react";
import React from "react";
import AuthNav from "./AuthNav";

const AuthLayout = ({ children }) => {
  return (
    <Box h="100vh" overflowY="hidden">
      <AuthNav />
      <Box display="flex" justifyContent="center">
        <Box w="full" maxW="2000px" overflowX="hidden">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
