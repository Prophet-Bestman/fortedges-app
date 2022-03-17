import { Box, Text } from "@chakra-ui/react";
import { SigninForm } from "components/auth";
import Head from "next/head";
import React from "react";

const Signin = () => {
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
        <SigninForm />
      </Box>
    </Box>
  );
};

export default Signin;
