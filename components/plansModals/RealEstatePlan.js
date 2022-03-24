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
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import HistoricalPerformance from "./HistoricalPerformance";
import { portfolioCountries } from "data";
import Link from "next/link";

const RealEstatePlan = ({ isOpen, onClose }) => {
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
            Real Estate
          </Text>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Flex justify="center">
            <Image src="/img/realEstate.png" />
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
              "Best for those who want a balance of good returns with medium level capital. This plan invests in rented buildings and properties around the world and return is 20 - 22.5% per annum."
            }
          </Text>

          <Flex justify="center" fontSize="14px">
            <Text mb="40px" color="text.grey">
              Range -{" "}
            </Text>
            <Text>$50,000 - $100,000</Text>
          </Flex>

          <HistoricalPerformance />
          <Box mt={"48px"}>
            <Text textAlign="center" fontSize="13px">
              Companies in our porfolio
            </Text>

            <Flex my="24px" justifyContent="center" gap={"-5px"}>
              {portfolioCountries.map((country) => (
                <Image mr="-18px" src={country} key={country} />
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
          <Button variant="green" w="full" onClick={onClose}>
            Get Stared
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RealEstatePlan;
