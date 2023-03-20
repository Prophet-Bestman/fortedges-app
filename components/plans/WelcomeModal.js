import {
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  Text,
} from "@chakra-ui/react";
import React from "react";
import PlanResponsive from "./PlanResponsive";

const WelcomeModal = ({ isOpen, onClose, plans }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalContent>
        <ModalBody p="110px">
          <Heading fontWeight="400" textAlign="center" mb="4">
            Welcome to Ubassets
          </Heading>

          <Text
            textAlign="center"
            fontSize={"24px"}
            color="text.grey"
            fontWeight={500}
          >
            Choose a plan to get started
          </Text>

          <Flex mt="16" gap="24px" wrap="wrap" justify="center">
            {!!plans &&
              plans?.length > 0 &&
              plans.map((plan) => (
                <PlanResponsive plan={plan} key={plan._id} />
              ))}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WelcomeModal;
