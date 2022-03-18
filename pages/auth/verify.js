import { Box } from "@chakra-ui/react";
import { SigninForm, VerifyResponse } from "components/auth";
import { AuthLayout } from "components/layouts";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Verify = () => {
  const router = useRouter();
  const { email } = router.query;
  console.log(email);
  return (
    <AuthLayout>
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
    </AuthLayout>
  );
};

export default Verify;

export const icProps = async () => {};
