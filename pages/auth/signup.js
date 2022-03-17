import { Box, Text } from "@chakra-ui/react";
import { SignupForm } from "components/auth";
import Head from "next/head";
import React from "react";

const Signup = () => {
  return (
    <Box>
      <Head>
        <title>Sign Up | Fortedges</title>
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
        <SignupForm />
      </Box>
    </Box>
  );
};

export default Signup;
