import { Box } from "@chakra-ui/react";
import ForgotPasswordForm from "components/auth/ForgotPasswordForm";
import Head from "next/head";
import React from "react";

const ForgotPassword = () => {
  return (
    <Box>
      <Head>
        <title>Forgot Password | Ubassets</title>
      </Head>
      <Box
        minH="100vh"
        bg="app.primary"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        color="text.black"
      >
        <ForgotPasswordForm />
      </Box>
    </Box>
  );
};

export default ForgotPassword;
