import React, { useContext, useEffect } from "react";
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
import { AuthContext } from "providers/AuthProvider";

const CryptoPremiumPlan = ({ isOpen, onClose, plan, customPlan }) => {
  const { min, max, _id, name } = plan;
  const { dispatch: setOpen, planFormState } = useContext(PlanFormContext);
  const { dispatch: resetPlan } = useContext(PlanFormContext);
  const { dispatch: configureForm } = useContext(PlanFormContext);
  const { user } = useContext(AuthContext);

  const {
    isOpen: isPortfolioOpen,
    onClose: onPortfolioClose,
    onOpen: onPortfolioOpen,
  } = useDisclosure();

  useEffect(() => {
    if (!!customPlan) {
      configureForm({
        type: planFormActions.CONFIGURE_FORM,
        payload: {
          isOpen: false,
          id: _id,
          parent_plan_name: name,
          plan_user: null,
          ...(!!customPlan && {
            user_id: customPlan.owner,
            plan_id: customPlan?._id,
          }),
        },
      });
    }
  }, [customPlan]);

  const closeParent = () => {
    resetPlan({ type: planFormActions.RESET_PLAN });
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
            Crypto premium
          </Text>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Flex justify="center">
            <Circle bg={planProps?.cryptoPremium.color} size="96px">
              <Image src={planProps?.cryptoPremium.img} w="10" />
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

            {`Our Crypto basic plan is perfect for you if you’ve got a good capital and would like to own a slice of mining and incredible returns of cryptocurrenncyWe’ve delivered historical returns of 18% per month to our Long term investors.Returns are updated every weekday.`}
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

          <HistoricalPerformance history={planProps?.cryptoPremium?.history} />
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
              setOpen({ type: planFormActions.OPEN_FORM });
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

export default CryptoPremiumPlan;
