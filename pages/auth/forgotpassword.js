import { Box } from "@chakra-ui/react";
import { VerifyResponse } from "components/auth";
import ForgotPasswordForm from "components/auth/ForgotPasswordForm";
import { AuthLayout } from "components/layouts";
import Head from "next/head";
import React from "react";

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <Head>
        <title>Forgot Password | Fortedges</title>
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
    </AuthLayout>
  );
};

export default ForgotPassword;
