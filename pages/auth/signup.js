import { Box } from "@chakra-ui/react";
import { SignupForm } from "components/auth";
import { AuthNav } from "components/layouts";
import Head from "next/head";
import React from "react";

const Signup = () => {
  return (
    <>
      <Head>
        <title>Sign Up | Ubassets</title>
      </Head>
      <Box
        py="50px"
        bg="app.primary"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        color="text.black"
      >
        <SignupForm />
      </Box>
    </>
  );
};

export default Signup;
