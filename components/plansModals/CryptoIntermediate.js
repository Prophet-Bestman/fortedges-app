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
import { planProps } from "data";
import Link from "next/link";
import { planFormActions, PlanFormContext } from "providers/PlanFormProvider";
import SubmitPlan from "./SubmitPlan";
import { saveParentPlanId } from "api/config";
import OurPortfolio from "./OurPortfolio";

const CryptoIntermediatePlan = ({ isOpen, onClose, plan, customPlan }) => {
  const { min, max, _id, name } = plan;
  const { dispatch: setOpen, planFormState } = useContext(PlanFormContext);
  const { dispatch: setUserID } = useContext(PlanFormContext);
  const { dispatch: setParentID } = useContext(PlanFormContext);
  const { dispatch: setParentName } = useContext(PlanFormContext);
  const { dispatch: setPlanId } = useContext(PlanFormContext);

  const user = planFormState?.plan_user;
  const {
    isOpen: isPortfolioOpen,
    onClose: onPortfolioClose,
    onOpen: onPortfolioOpen,
  } = useDisclosure();

  const closeParent = () => {
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
            Crypto Intermediate plan
          </Text>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Flex justify="center">
            <Circle bg={planProps?.cryptoIntermediate.color} size="96px">
              <Image src={planProps?.cryptoIntermediate.img} w="10" />
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
            {/* {description} */}
            {`Our intermediate plan is perfect for you if you’ve got a good capital and would like to own a slice of mining and incredible returns of cryptocurrenncyWe’ve delivered historical returns of 33% per month to our Long term investors.Returns are updated every weekday.`}
          </Text>

          <Flex justify="center" fontSize="14px">
            <Text fontWeight={600} mb="40px" color="text.black" mr="2">
              Range:
            </Text>
            <Text mb="40px" color="text.grey">
              ${min?.toLocaleString()} - {typeof max === "number" && "$"}
              {max?.toLocaleString()}
            </Text>
          </Flex>

          <HistoricalPerformance
            history={planProps?.cryptoIntermediate?.history}
          />
          <Box mt={"48px"}>
            {/* <Text textAlign="center" fontSize="13px">
              Companies in our porfolio
            </Text> */}

            {/* <Flex my="24px" justifyContent="center" gap={"-5px"}>
              {portfolioBrands.map((brand) => (
                <Image mr="-18px" src={brand} key={brand} />
              ))}
            </Flex> */}
            <Text textAlign="center" fontSize="13px">
              To learn more about our assets, go to{" "}
              <Link href="#">
                <Text
                  textDecor={"underline"}
                  cursor="pointer"
                  onClick={onPortfolioOpen}
                >
                  See our Porfolio
                </Text>
              </Link>
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="yellow"
            w="full"
            onClick={() => {
              setParentName({
                type: planFormActions.SET_PARENT_NAME,
                payload: name,
              });
              setParentID({ type: planFormActions.SET_ID, payload: _id });
              saveParentPlanId(_id);
              setOpen({ type: planFormActions.OPEN_FORM });
              setUserID({
                type: planFormActions.SET_USER_ID,
                payload: user?._id,
              });
              !!customPlan &&
                setPlanId({
                  type: planFormActions.SET_PLAN_ID,
                  payload: customPlan?._id,
                });
            }}
          >
            {user?.has_plan ? "Upgrade" : "Get Started"}
          </Button>
        </ModalFooter>
      </ModalContent>
      {planFormState?.isOpen && <SubmitPlan closeParent={closeParent} />}
      <OurPortfolio isOpen={isPortfolioOpen} onClose={onPortfolioClose} />
    </Modal>
  );
};

export default CryptoIntermediatePlan;