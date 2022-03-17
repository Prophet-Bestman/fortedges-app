import { Box } from "@chakra-ui/react";
import { SigninForm, VerifyResponse } from "components/auth";
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
        <title>Sign In | Fortedges</title>
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
        <VerifyResponse email={email} />
      </Box>
    </Box>
  );
};

export default Verify;

export const icProps = async () => {};
