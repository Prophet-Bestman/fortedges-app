import { Box } from "@chakra-ui/react";
import React from "react";
import AuthNav from "./AuthNav";

const AuthLayout = ({ children }) => {
  return (
    <Box bg="app.primary" pos="relative">
      <AuthNav />
      <Box display="flex" justifyContent="center" h="100vh">
        <Box w="full" maxW="2000px" overflowX="hidden" h="full">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
