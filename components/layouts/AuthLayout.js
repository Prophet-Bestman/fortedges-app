import { Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AuthContext } from "providers/AuthProvider";
import React, { useContext, useEffect } from "react";
import AuthNav from "./AuthNav";

const AuthLayout = ({ children }) => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!!user && Object.keys(user).length > 0) router.back();
  }, [user]);
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
