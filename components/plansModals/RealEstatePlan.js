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
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import HistoricalPerformance from "./HistoricalPerformance";
import Link from "next/link";
import { planFormActions, PlanFormContext } from "providers/PlanFormProvider";
import { formatter } from "utils";
import SubmitPlan from "./SubmitPlan";
import { portfolioCountries } from "data";
import OurPortfolio from "./OurPortfolio";

const RealEstatePlan = ({ isOpen, onClose, plan, userID }) => {
  const { min, max, description, _id, name } = plan;
  const { dispatch: setOpen } = useContext(PlanFormContext);
  const { dispatch: setUserID } = useContext(PlanFormContext);
  const { dispatch: setParentID } = useContext(PlanFormContext);
  const { dispatch: setParentName } = useContext(PlanFormContext);

  const {
    isOpen: isPortfolioOpen,
    onClose: onPortfolioClose,
    onOpen: onPortfolioOpen,
  } = useDisclosure();

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
              <Text
                textDecor={"underline"}
                cursor="pointer"
                onClick={onPortfolioOpen}
              >
                See our Porfolio
              </Text>
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="green"
            w="full"
            onClick={() => {
              setParentName({
                type: planFormActions.SET_PARENT_NAME,
                payload: name,
              });
              setParentID({ type: planFormActions.SET_ID, payload: _id });

              setOpen({ type: planFormActions.OPEN_FORM });
              setUserID({ type: planFormActions.SET_USER_ID, payload: userID });
            }}
          >
            Get Started
          </Button>
        </ModalFooter>
      </ModalContent>
      <SubmitPlan closeParent={onClose} />
      <OurPortfolio isOpen={isPortfolioOpen} onClose={onPortfolioClose} />
    </Modal>
  );
};

export default RealEstatePlan;

<></>;
