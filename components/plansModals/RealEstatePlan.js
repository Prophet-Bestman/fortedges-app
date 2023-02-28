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
  Circle,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import HistoricalPerformance from "./HistoricalPerformance";
import Link from "next/link";
import { planFormActions, PlanFormContext } from "providers/PlanFormProvider";
import { formatter } from "utils";
import SubmitPlan from "./SubmitPlan";
import { planProps, portfolioCountries } from "data";
import OurPortfolio from "./OurPortfolio";
import { AuthContext } from "providers/AuthProvider";

const RealEstatePlan = ({ isOpen, onClose, plan, customPlan }) => {
  const { min, max, description, _id, name } = plan;
  const { user } = useContext(AuthContext);
  const { dispatch: setOpen } = useContext(PlanFormContext);
  const { dispatch: setUserID } = useContext(PlanFormContext);
  const { dispatch: setParentID } = useContext(PlanFormContext);
  const { dispatch: setParentName } = useContext(PlanFormContext);
  const { dispatch: setPlanId } = useContext(PlanFormContext);

  const {
    isOpen: isPortfolioOpen,
    onClose: onPortfolioClose,
    onOpen: onPortfolioOpen,
  } = useDisclosure();

  const closeParent = () => {
    onPortfolioClose();
    onClose();
  };

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
            <Circle bg={planProps?.realEstate.color} size="96px">
              <Image src={planProps?.realEstate.img} w="10" />
            </Circle>
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
            <Text fontWeight={600} mb="40px" color="text.black" mr="2">
              Range:
            </Text>
            <Text mb="40px" color="text.grey">
              ${min} - {typeof max === "number" && "$"}
              {max}
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
              setUserID({
                type: planFormActions.SET_USER_ID,
                payload: user?._id,
              });
              setPlanId({
                type: planFormActions.SET_PLAN_ID,
                payload: customPlan._id,
              });
            }}
          >
            {user?.has_plan ? "Upgrade" : "Get Started"}
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
