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
import { planFormActions, PlanFormContext } from "providers/PlanFormProvider";
import SubmitPlan from "./SubmitPlan";
import { planProps, portfolioCountries } from "data";
import OurPortfolio from "./OurPortfolio";
import { AuthContext } from "providers/AuthProvider";

const RealEstatePlan = ({ isOpen, onClose, plan, customPlan }) => {
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

  const closeParent = () => {
    // onPortfolioClose();
    resetPlan({ type: planFormActions.RESET_PLAN });
    onClose();
  };

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

  return (
    <Modal isOpen={isOpen} size="full">
      <ModalOverlay backdropFilter="blur(10px) hue-rotate(90deg)" />
      <ModalContent py="30px" color="text.black" maxW="400px">
        <ModalHeader alignItems="center" display="flex">
          <AiOutlineArrowLeft
            style={{
              cursor: "pointer",
            }}
            onClick={closeParent}
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
            {/* {description} */}
            {`Best for those who want a balance of good returns with medium level
            capital. This plan invests in rented buildings and properties around
            the world and return is 20 - 22.5% per annum`}
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

          <HistoricalPerformance history={planProps.realEstate.history} />
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
              setOpen({ type: planFormActions.OPEN_FORM });
            }}
          >
            {user?.has_plan ? "Upgrade" : "Get Started"}
          </Button>
        </ModalFooter>
      </ModalContent>
      {planFormState?.isOpen && <SubmitPlan closeParent={onClose} />}
      <OurPortfolio isOpen={isPortfolioOpen} onClose={onPortfolioClose} />
    </Modal>
  );
};

export default RealEstatePlan;

<></>;
