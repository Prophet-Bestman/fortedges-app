import { Box, Text } from "@chakra-ui/react";
import { SigninForm } from "components/auth";
import { AuthLayout } from "components/layouts";
import Head from "next/head";
import React from "react";

const Signin = () => {
  return (
    <AuthLayout>
      <Head>
        <title>Sign In | Fortedges</title>
      </Head>
      <Box
        minH="100vh"
        bg="app.primary"
        py="90px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        color="text.black"
      >
        <SigninForm />
      </Box>
    </AuthLayout>
  );
};

export default Signin;
