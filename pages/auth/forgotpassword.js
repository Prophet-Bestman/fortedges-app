import { Box } from "@chakra-ui/react";
import { VerifyResponse } from "components/auth";
import ForgotPasswordForm from "components/auth/ForgotPasswordForm";
import Head from "next/head";
import React from "react";

const ForgotPassword = () => {
  return (
    <Box>
      <Head>
        <title>Sign In | Fortedges</title>
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
