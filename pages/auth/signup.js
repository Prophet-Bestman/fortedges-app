import { Box, Text } from "@chakra-ui/react";
import { SignupForm } from "components/auth";
import { AuthLayout, AuthNav } from "components/layouts";
import Head from "next/head";
import React from "react";

const Signup = () => {
  return (
    <AuthLayout>
      <Head>
        <title>Sign Up | Fortedges</title>
      </Head>
      <AuthNav />
      <Box
        minH="100vh"
        py="90px"
        bg="app.primary"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        color="text.black"
      >
        <SignupForm />
      </Box>
    </AuthLayout>
  );
};

export default Signup;
