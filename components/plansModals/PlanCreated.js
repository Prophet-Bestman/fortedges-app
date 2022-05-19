import {
  Box,
  Button,
  Circle,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";

const PlanCreated = ({ isOpen, msg, closeParent, plan }) => {
  const router = useRouter();

  return (
    <Modal isOpen={isOpen} size="sm" isCentered>
      <ModalOverlay />
      <ModalContent py="14px" px="24px" w="full">
        <Box w="full" h="full" position="relative">
          <Circle
            pos="absolute"
            right={0}
            onClick={closeParent}
            cursor="pointer"
            size="40px"
          >
            <AiOutlineClose />
          </Circle>
        </Box>

        <ModalBody px="0">
          <Flex
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            mb="20px"
          >
            <Image src="/img/success.svg" mb="20px" />

            <Box w="full" maxW={"380px"}>
              <Text
                textAlign="center"
                fontWeight="600"
                mb="40px"
                fontSize={"20px"}
              >
                {msg}
              </Text>
            </Box>

            <Button
              rightIcon={<BsArrowRight fontSize="20px" />}
              variant="ghost"
              fontWeight={600}
              color="app.primary"
              size="lg"
              onClick={() => router.push(`/myplans/${plan?._id}`)}
            >
              Go to plan
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PlanCreated;
