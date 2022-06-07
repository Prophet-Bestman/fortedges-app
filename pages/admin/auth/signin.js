import { Box } from "@chakra-ui/react";
import { AdminSigninForm } from "components/admin";
import Head from "next/head";
import React from "react";

const AdminSignin = () => {
  return (
    <Box>
      <Head>
        <title>Sign In | Ubassets</title>
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
        <AdminSigninForm />
      </Box>
    </Box>
  );
};

export default AdminSignin;
