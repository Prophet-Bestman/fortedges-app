import { Box, Image, Text } from "@chakra-ui/react";
import { PlanContext } from "providers/PlanProvider";
import React, { useContext } from "react";

const PlanDetailsBanner = () => {
  const { plan } = useContext(PlanContext);
  return (
    <Box
      h="120px"
      bg={
        plan?.parent_plan_name === "Premium Stock"
          ? "text.brown"
          : plan?.parent_plan_name === "Real Estate"
          ? "others.green"
          : "others.blue"
      }
      bgGradient="linear-gradient(178.73deg, rgba(196, 196, 196, 0) 1.08%, rgba(196, 196, 196, 0) 1.09%, rgba(0, 0, 0, 0.4) 98.92%)"
      position="relative"
    >
      <Image
        h="full"
        ml="140px"
        filter={"blur(3px)"}
        src={
          plan?.parent_plan_name === "Premium Stock"
            ? "/img/emojis/star.png"
            : plan?.parent_plan_name === "Real Estate"
            ? "/img/emojis/home2.png"
            : "/img/emojis/money.png"
        }
        alt=""
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        display="flex"
        justifyContent={"center"}
        alignItems="center"
      >
        <Box color="white" textAlign="center">
          {!!plan && (
            <Text fontSize="20px" fontWeight={500}>
              {plan.name}
            </Text>
          )}
          {!!plan && <Text fontSize="14px">{plan.parent_plan_name}</Text>}
        </Box>
      </Box>
    </Box>
  );
};

export default PlanDetailsBanner;
