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
import { portfolioBrands } from "data";
import Link from "next/link";
import { planFormActions, PlanFormContext } from "providers/PlanFormProvider";
import { formatter } from "utils";
import SubmitPlan from "./SubmitPlan";
import { saveParentPlanId } from "api/config";
import OurPortfolio from "./OurPortfolio";

const PremiumPlan = ({ isOpen, onClose, plan, userID }) => {
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
            Premium Stock
          </Text>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
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

export default PremiumPlan;
