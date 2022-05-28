import { Box } from "@chakra-ui/react";
import { SigninForm } from "components/auth";
import Head from "next/head";
import React from "react";

const Signin = () => {
  return (
    <Box>
      <Head>
        <title>Sign In | Fortedges</title>
      </Head>
      <Box
        h="full"
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
    </Box>
  );
};

export default Signin;
