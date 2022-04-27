import { Box, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { planProps } from "data";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { formatter } from "utils";

const PlanBox = ({ plan, onClick }) => {
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

  const amount = formatter.format(investment + profit);
  return (
    <Box
      cursor="pointer"
      onClick={onClick}
      bgColor={currentPlanProps?.color}
      bgRepeat="no-repeat"
      w="full"
      maxW="327px"
      h="280px"
      p="16px"
      display="flex"
      justifyContent="center"
      borderRadius="12px"
      bgGradient="linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, rgba(196, 196, 196, 0) 0.01%, rgba(0, 0, 0, 0.4) 100%)"
      position="relative"
    >
      <Flex alignItems="center" h="100%">
        <Image
          style={{
            filter: "blur(4px)",
          }}
          src={currentPlanProps?.img}
          objectPosition="center"
          w="full"
        />
      </Flex>
      <Flex
        position="absolute"
        bottom={0}
        p="16px"
        w="full"
        h="100px"
        color="white"
        justifyContent="space-between"
        alignItems="end"
      >
        <Box>
          <Text fontWeight="200" fontSize="12px" maxW="90px" mb="8px">
            {name}
          </Text>
          <Text>{amount}</Text>
        </Box>
        <Box>
          <Text
            display="flex"
            fontWeight="200"
            alignItems={"center"}
            gap="4px"
            fontSize="12px"
            maxW="90px"
            mb="8px"
          >
            <FiArrowUpRight fontSize="18px" />
            {`+ ${formatter.format(profit)}`}
          </Text>
          <Text>{parent_plan_name}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PlanBox;
