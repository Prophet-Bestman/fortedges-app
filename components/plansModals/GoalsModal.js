import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  Flex,
  Image,
  Box,
  Circle,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import HistoricalPerformance from "./HistoricalPerformance";
import { portfolioBrands } from "data";
import Link from "next/link";

const GoalsPlan = ({ isOpen, onClose, goalProps }) => {
  const { title, text, color, icon } = goalProps;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent py="30px" color="text.black">
        <ModalHeader alignItems="center" display="flex">
          <AiOutlineArrowLeft
            style={{
              cursor: "pointer",
            }}
            onClick={onClose}
          />
          <Text fontSize="24px" fontWeight={500} mx="auto">
            {title}
          </Text>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Text
            py="12px"
            px="24px"
            color="text.grey"
            textAlign="center"
            fontSize="14px"
            mb="16px"
          >
            {text}
          </Text>

          <Flex justify="center" fontSize="14px">
            <Text mb="40px" color="text.grey">
              Range -{" "}
            </Text>
            <Text> $2,000 - $4,000</Text>
          </Flex>

          <Flex justify="center">
            <Circle size="96px" bg={color}>
              <Image w="48px" src={icon} />
            </Circle>
          </Flex>
          <HistoricalPerformance />
          <Box mt={"48px"}>
            <Text textAlign="center" fontSize="13px">
              Companies in our porfolio
            </Text>

            <Flex my="24px" justifyContent="center" gap={"-5px"}>
              {portfolioBrands.map((brand) => (
                <Image mr="-18px" src={brand} key={brand} />
              ))}
            </Flex>
            <Text textAlign="center" fontSize="13px">
              To learn more about our assets, go to{" "}
              <Link href="#">
                <Text textDecor={"underline"} cursor="pointer">
                  See our Porfolio
                </Text>
              </Link>
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button w="full" onClick={onClose}>
            Get Started
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default GoalsPlan;
