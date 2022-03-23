import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Flex,
  Image,
  Box,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import HistoricalPerformance from "./HistoricalPerformance";
import { portfolioBrands } from "data";
import Link from "next/link";

const PremiumPlan = ({ isOpen, onOpen, onClose }) => {
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
            Premium Stock
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center">
            <Image src="/img/premium.png" />
          </Flex>

          <Text
            py="12px"
            px="24px"
            color="text.grey"
            textAlign="center"
            fontSize="14px"
            mb="16px"
          >
            {
              "Our premium plan is perfect for you if you’ve got a high capital and would like to own a slice of high-growth companies like Microsoft, Netflix, and many more. We’ve delivered historical returns of 35% per annum to our Long term investors.Returns are updated every weekday."
            }
          </Text>

          <Flex justify="center" fontSize="14px">
            <Text color="text.grey">Range - </Text>
            <Text> $2,000 - $4,000</Text>
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
          <Button variant="yellow" w="full" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PremiumPlan;
