import { Box, Circle, Img, Text, useDisclosure } from "@chakra-ui/react";
import {
  CryptoBasicPlan,
  CryptoIntermediatePlan,
  CryptoPremiumPlan,
  FixedIncomePlan,
  RealEstatePlan,
} from "components/plansModals";
import { planProps } from "data";
import { AuthContext } from "providers/AuthProvider";
import React, { useContext, useEffect, useState } from "react";

const UpgradePlanCard = ({ plan, customPlan }) => {
  const [currentPlanProps, setCurrentPlanProps] = useState();
  const { user } = useContext(AuthContext);

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

  useEffect(() => {
    if (plan !== undefined) {
      switch (plan?.name) {
        case "Fixed Income":
          setCurrentPlanProps(planProps.fixedIncome);
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
    switch (plan?.name) {
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
      color="text.grey"
      bg="gray.50"
      display="flex"
      p="8px"
      mt="8px"
      cursor="pointer"
      _hover={{ bg: "gray.100" }}
      alignItems="center"
      onClick={handlePlan}
    >
      <Circle size="16" bg={currentPlanProps?.bg}>
        <Img
          pos="relative"
          zIndex="docked"
          src={currentPlanProps?.img}
          w="24px"
        />
      </Circle>
      <Box ml="18px" mr="auto">
        <Text fontSize="14px">Earn up to {plan?.interest * 365} per annum</Text>
        <Text mb="4px" color="text.black">
          Upgrade to {plan?.name}
        </Text>
      </Box>
      {isCryptoPremiumOpen && (
        <CryptoPremiumPlan
          isOpen={isCryptoPremiumOpen}
          onClose={onCryptoPremiumClose}
          plan={plan}
          customPlan={customPlan}
        />
      )}
      {isCryptoIntermediateOpen && (
        <CryptoIntermediatePlan
          isOpen={isCryptoIntermediateOpen}
          onClose={onCryptoIntermediateClose}
          plan={plan}
          customPlan={customPlan}
        />
      )}
      {isCryptoBasicOpen && (
        <CryptoBasicPlan
          isOpen={isCryptoBasicOpen}
          onClose={onCryptoBasicClose}
          plan={plan}
          customPlan={customPlan}
        />
      )}
      {isRealEstateOpen && (
        <RealEstatePlan
          isOpen={isRealEstateOpen}
          onClose={onRealEstateClose}
          plan={plan}
          customPlan={customPlan}
        />
      )}
      {isFixedIncomeOpen && (
        <FixedIncomePlan
          isOpen={isFixedIncomeOpen}
          onClose={onFixedIncomeClose}
          plan={plan}
          customPlan={customPlan}
        />
      )}
    </Box>
  );
};

export default UpgradePlanCard;
