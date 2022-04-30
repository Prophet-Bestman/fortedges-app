import {
  Box,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { planProps } from "data";
import React, { useEffect, useState } from "react";
import { formatter } from "utils";

const UserPlan = ({ plan }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { investment, name, parent_plan_name, profit } = plan;
  const [currentPlanProps, setCurrentPlanProps] = useState();

  useEffect(() => {
    if (plan !== undefined) {
      switch (plan.parent_plan_name) {
        case "Fixed Income":
          setCurrentPlanProps(planProps.fixedIncome);
          break;
        case "Real Estate":
          setCurrentPlanProps(planProps.realEstate);
          break;
        case "Premium Stock":
          setCurrentPlanProps(planProps.premiumStock);
          break;

        default:
          break;
      }
    }
  }, [plan]);

  return (
    <Box
      onClick={onOpen}
      bgColor={currentPlanProps?.color}
      cursor="pointer"
      bgRepeat="no-repeat"
      w="full"
      maxW="166px"
      h="196px"
      p="16px"
      display="flex"
      justifyContent="center"
      borderRadius="12px"
      // alignItems='center'
      position="relative"
      _before={{
        content: "''",
        bgGradient:
          "linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, rgba(196, 196, 196, 0) 0.01%, rgba(0, 0, 0, 0.4) 100%)",
        position: "absolute",
        borderRadius: "12px",
        top: 0,
        left: 0,
        h: "100%",
        w: "100%",
      }}
    >
      <Box>
        <Image
          style={{
            filter: "blur(4px)",
          }}
          src={currentPlanProps?.img}
          w="101px"
        />
      </Box>

      <Box bottom="14px" position="absolute" color="white">
        <Text mb="4px" fontSize="13px" w="80%" isTruncated>
          {name}
        </Text>
        <Text mb="4px" fontSize="15px" fontWeight={600}>
          {formatter.format(investment + profit)}
        </Text>
        <Text mb="4px" fontSize="13px">
          {parent_plan_name}
        </Text>
      </Box>
      <PlanBalance isOpen={isOpen} onClose={onClose} plan={plan} />
    </Box>
  );
};

export default UserPlan;

const PlanBalance = ({ isOpen, onClose, plan }) => {
  const { investment, profit, gain } = plan;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xs" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody py="12px">
          <Text fontSize={"14px"} color="text.grey" textAlign="center">
            Plan Balance
          </Text>
          <Text
            fontSize={"24px"}
            color="text.black"
            textAlign="center"
            fontWeight={600}
            mb="10px"
          >
            {formatter.format(profit + investment)}
          </Text>
          <Text
            fontSize={"12px"}
            color="text.black"
            textAlign="center"
            mb="4px"
          >
            Profits
          </Text>

          <Text
            fontSize="13px"
            d="flex"
            justifyContent={"center"}
            color="green.300"
            gap="6px"
          >
            <Text>+{formatter.format(profit)}</Text>
            {/* <Text>+{gain}</Text> */}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
