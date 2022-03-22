import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const PlanDetailsBanner = ({ category, name }) => {
  return (
    <Box
      h="120px"
      bg={
        category === "Premium Stock"
          ? "text.brown"
          : category === "Real Estate"
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
          category === "Premium Stock"
            ? "/img/emojis/star.png"
            : category === "Real Estate"
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
          <Text fontSize="20px" fontWeight={500}>
            {name}
          </Text>
          <Text fontSize="14px">{category}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PlanDetailsBanner;
