import { Box, Text } from "@chakra-ui/react";
import React from "react";
import AuthCard from "./AuthCard";
import Link from "next/link";

const VerifyResponse = ({ email }) => {
  return (
    <Box
      w="full"
      display="flex"
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      my="80px"
    >
      <Text fontSize={[24, , 28, 32]} color="white" fontWeight="600">
        Verify your email
      </Text>
      <AuthCard>
        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems={"center"}
          px="40px"
          pt="80px"
        >
          <img src="/img/mail_verify.png" alt="" />

          <Text textAlign="center" mt="32px">
            We sent a verification email to <strong>{email}</strong> Click the
            link inside to get started!
          </Text>
          <Text textAlign="center" mt="64px" color="app.primary">
            <Link href="/auth/forgotpassword">{"Email didn't arrive? "}</Link>
          </Text>
        </Box>
      </AuthCard>

      <Link href="#">
        <Text
          cursor="pointer"
          fontWeight="600"
          color="white"
          textAlign="center"
        >
          Sign Out
        </Text>
      </Link>
    </Box>
  );
};

export default VerifyResponse;
