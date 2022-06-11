import { Box } from "@chakra-ui/react";
import { SigninForm } from "components/auth";
import Head from "next/head";
import React from "react";

const Signin = () => {
  return (
    <Box h="full">
      <Head>
        <title>Sign In | Ubassets</title>
      </Head>
      <Box
        h="full"
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
