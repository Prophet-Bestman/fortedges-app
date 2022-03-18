import { Box } from "@chakra-ui/react";
import { VerifyResponse } from "components/auth";

import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Verify = () => {
  const router = useRouter();
  const { email } = router.query;
  console.log(email);
  return (
    <Box>
      <Head>
        <title>Verify Email | Fortedges</title>
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
        <VerifyResponse email={email} />
      </Box>
    </Box>
  );
};

export default Verify;
