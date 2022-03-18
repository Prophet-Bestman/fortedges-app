import { Box } from "@chakra-ui/react";
import { SignupForm } from "components/auth";
import { AuthNav } from "components/layouts";
import Head from "next/head";
import React from "react";

const Signup = () => {
  return (
    <Box>
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
    </Box>
  );
};

export default Signup;
