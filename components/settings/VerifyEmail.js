import { Box, Modal, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";
import { AuthCard } from "components/auth";
// import Link from "next/link";
import React from "react";

const VerifyEmail = ({ isOpen, onClose, email }) => {
  return (
    <Modal size="sm" h isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="app.primary" />
      <ModalContent bg="app.primary">
        <AuthCard m="0">
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
            <Text
              textAlign="center"
              mt="64px"
              color="app.primary"
              onClick={onClose}
            >
              {/* <Link href="/auth/forgotpassword">{"Email didn't arrive? "}</Link> */}
              {"Email didn't arrive? "}
            </Text>
          </Box>
        </AuthCard>
      </ModalContent>
    </Modal>
  );
};

export default VerifyEmail;
