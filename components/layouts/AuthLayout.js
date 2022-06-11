import { Box } from "@chakra-ui/react";
import React from "react";
import AuthNav from "./AuthNav";

const AuthLayout = ({ children }) => {
  return (
    <Box bg="app.primary" pos="relative">
      <AuthNav />
      <Box display="flex" justifyContent="center">
        <Box w="full" maxW="2000px" overflowX="hidden" h="100vh">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
