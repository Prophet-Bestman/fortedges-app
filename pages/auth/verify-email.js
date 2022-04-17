import { Box, Flex, Spinner, useDisclosure, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useVerifyEmail } from "api/auth";
import { SuccessModal, ErrorModal } from "components";
import { useRouter } from "next/router";

const VerifyEmail = () => {
  const [verifiedData, setVerifiedData] = useState();
  const router = useRouter();
  const { code } = router.query;

  const { isOpen: isErrorOpen, onOpen: onErrorOpen } = useDisclosure();
  const { isOpen: isSuccessOpen, onOpen: onSuccessOpen } = useDisclosure();

  const { data: verificationData, error } = useVerifyEmail(code);

  useEffect(() => {
    if (verificationData !== undefined) {
      if (verificationData.toString().includes("Error")) {
        onErrorOpen();
      } else {
        setVerifiedData(verificationData);
        onSuccessOpen();
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    }
  }, [verificationData]);

  useEffect(() => {
    if (!!error) {
      onErrorOpen();
    }
  }, [error]);

  return (
    <Flex h="100vh" justify={"center"} alignItems="center" flexDir="column">
      {!verifiedData && (
        <>
          <Spinner
            thickness="4px"
            mx="auto"
            speed="0.65s"
            emptyColor="gray.200"
            color="app.primary"
            size="xl"
            h="120px"
            w="120px"
          />
          <Text
            fontSize="28px"
            fontWeight={600}
            mt="24px"
            textAlign="center"
            color={"app.primary"}
          >
            Verifying Email !
          </Text>
          <Text fontSize="20px" fontWeight={600} mt="4px" textAlign="center">
            Please Wait
          </Text>
        </>
      )}
      <ErrorModal
        isOpen={isErrorOpen}
        msg={"An error Occurred verifying your Email"}
      />
      <SuccessModal
        isOpen={isSuccessOpen}
        msg={"Email has been verified successfully."}
      />
    </Flex>
  );
};

export default VerifyEmail;
// VerifyEmail.requireAuth = true;
