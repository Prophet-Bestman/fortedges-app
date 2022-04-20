import React, { useContext } from "react";
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
import Link from "next/link";
import { planFormActions, PlanFormContext } from "providers/PlanFormProvider";
import { formatter } from "utils";
import SubmitPlan from "./SubmitPlan";
import { portfolioCountries } from "data";

const RealEstatePlan = ({ isOpen, onClose, plan }) => {
  const { min, max, description, _id, name } = plan;
  const { dispatch: setOpen } = useContext(PlanFormContext);
  return (
    <Modal isOpen={isOpen} size="full">
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent py="30px" color="text.black" maxW="400px">
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
            {description}
          </Text>

          <Flex justify="center" fontSize="14px">
            <Text mb="40px" color="text.grey">
              Range -{" "}
            </Text>
            <Text>
              {" "}
              {formatter.format(min)} - {formatter.format(max)}
            </Text>
          </Flex>

          <HistoricalPerformance />
          <Box mt={"48px"}>
            <Text
              display="flex"
              justifyContent="center"
              textAlign="center"
              fontSize="13px"
            >
              Assets in our portfolio
              <Text ml="2px" color="text.grey">
                (By country)
              </Text>
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
          <Button
            variant="green"
            w="full"
            onClick={() => {
              setOpen({ type: planFormActions.SET_PARENT_NAME, payload: name });
              setOpen({ type: planFormActions.SET_ID, payload: _id });
              setOpen({ type: planFormActions.OPEN_FORM });
            }}
          >
            Get Started
          </Button>
        </ModalFooter>
      </ModalContent>
      <SubmitPlan closeParent={onClose} />
    </Modal>
  );
};

export default RealEstatePlan;

<></>;
