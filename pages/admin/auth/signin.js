import { Box } from "@chakra-ui/react";
import { SigninForm } from "components/auth";
import Head from "next/head";
import React from "react";

const AdminSignin = () => {
  return (
    <Box>
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
    </Box>
  );
};

export default AdminSignin;
