import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import {
  CryptoBasicPlan,
  CryptoIntermediatePlan,
  CryptoPremiumPlan,
  FixedIncomePlan,
  RealEstatePlan,
} from "components/plansModals";
import { goalModalProps, planProps } from "data";
import { AuthContext } from "providers/AuthProvider";
import React, { useState, useEffect, useContext } from "react";

const PlanResponsive = ({ plan }) => {
  const { name } = plan;
  const [currentPlanProps, setCurrentPlanProps] = useState();
  const [goalProps, setGoalProps] = useState(goalModalProps.fixedIncome);
  const { user } = useContext(AuthContext);

  // const {
  //   isOpen: isPremiumOpen,
  //   onClose: onPremiumClose,
  //   onOpen: onPremiumOpen,
  // } = useDisclosure();

  const {
    isOpen: isCryptoPremiumOpen,
    onClose: onCryptoPremiumClose,
    onOpen: onCryptoPremiumOpen,
  } = useDisclosure();
  const {
    isOpen: isCryptoIntermediateOpen,
    onClose: onCryptoIntermediateClose,
    onOpen: onCryptoIntermediateOpen,
  } = useDisclosure();
  const {
    isOpen: isCryptoBasicOpen,
    onClose: onCryptoBasicClose,
    onOpen: onCryptoBasicOpen,
  } = useDisclosure();
  const {
    isOpen: isFixedIncomeOpen,
    onClose: onFixedIncomeClose,
    onOpen: onFixedIncomeOpen,
  } = useDisclosure();
  const {
    isOpen: isRealEstateOpen,
    onClose: onRealEstateClose,
    onOpen: onRealEstateOpen,
  } = useDisclosure();

  // const {
  //   isOpen: isGoalOpen,
  //   onClose: onGoalClose,
  //   onOpen: onGoalOpen,
  // } = useDisclosure();

  useEffect(() => {
    if (plan !== undefined) {
      switch (name) {
        case "Fixed Income":
          setCurrentPlanProps(planProps.fixedIncome);
          setGoalProps(goalModalProps.fixedIncome);
          break;
        case "Real Estate":
          setCurrentPlanProps(planProps.realEstate);
          break;
        case "Cryptocurrency Premium":
          setCurrentPlanProps(planProps.cryptoBasic);

        case "Cryptocurrency Intermediate":
          setCurrentPlanProps(planProps.cryptoBasic);

        case "Cryptocurrency Basic":
          setCurrentPlanProps(planProps.cryptoBasic);
          break;

        default:
          break;
      }
    }
  }, [plan]);

  const handlePlan = () => {
    // if (name === "Premium Stock") {
    //   onPremiumOpen();
    // } else if (name === "Real Estate") {
    //   onRealEstateOpen();
    // } else onGoalOpen();

    switch (name) {
      case "Cryptocurrency Premium":
        onCryptoPremiumOpen();
        break;
      case "Cryptocurrency Intermediate":
        onCryptoIntermediateOpen();
        break;
      case "Cryptocurrency Basic":
        onCryptoBasicOpen();
        break;
      case "Fixed Income":
        onFixedIncomeOpen();
        break;
      case "Real Estate":
        onRealEstateOpen();
        break;

      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        bgColor: currentPlanProps?.color,
      }}
      bgColor={currentPlanProps?.color}
      bgRepeat="no-repeat"
      // w="full"
      mx={["auto", , , "0"]}
      w={["full", , "330px"]}
      h={["195", "200px", , "210px", "231px"]}
      p="24px"
      onClick={handlePlan}
      display="flex"
      flexDir="column"
      justifyContent="center"
      borderRadius="12px"
      bgGradient="linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, rgba(196, 196, 196, 0) 0.01%, rgba(0, 0, 0, 0.4) 100%)"
      position="relative"
      cursor="pointer"
    >
      <Flex h="100%">
        <Image
          src={currentPlanProps?.img}
          objectPosition="center"
          w={["60px", , , "90px"]}
          h={["60px", , , "90px"]}
        />
      </Flex>
      <Box color="white">
        <Text fontSize="15px" fontWeight="600" mb="4px">
          {name}
        </Text>
        <Text fontSize={"13px"}>{plan.interest}% ROI</Text>
        <Text fontSize={"13px"}>
          Range: ${plan?.min} - {typeof plan?.max === "number" && "$"}
          {plan?.max}
        </Text>
      </Box>

      <CryptoPremiumPlan
        isOpen={isCryptoPremiumOpen}
        onClose={onCryptoPremiumClose}
        plan={plan}
        userID={user?._id}
      />
      <CryptoIntermediatePlan
        isOpen={isCryptoIntermediateOpen}
        onClose={onCryptoIntermediateClose}
        plan={plan}
        userID={user?._id}
      />
      <CryptoBasicPlan
        isOpen={isCryptoBasicOpen}
        onClose={onCryptoBasicClose}
        plan={plan}
        userID={user?._id}
      />
      <RealEstatePlan
        isOpen={isRealEstateOpen}
        onClose={onRealEstateClose}
        plan={plan}
        userID={user?._id}
      />
      <FixedIncomePlan
        isOpen={isFixedIncomeOpen}
        onClose={onFixedIncomeClose}
        plan={plan}
        userID={user?._id}
      />
      {/* <PremiumPlan
        isOpen={isPremiumOpen}
        onClose={onPremiumClose}
        plan={plan}
        userID={user?._id}
      /> */}

      {/* <GoalsPlan
        isOpen={isGoalOpen}
        onClose={onGoalClose}
        goalProps={goalProps}
        plan={plan}
        id={_id}
        userID={user?._id}
      /> */}
    </Box>
  );
};

export default PlanResponsive;
