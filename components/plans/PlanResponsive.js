import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const PlanResponsive = ({ plan }) => {
  const { name, returnType, img, color } = plan;

  return (
    <Box
      bgColor={color}
      bgRepeat="no-repeat"
      w="full"
      maxW={["170", "200", , "280", "327px"]}
      h={["195", "220", , "260", "280px"]}
      p="16px"
      display="flex"
      flexDir="column"
      justifyContent="center"
      borderRadius="12px"
      bgGradient="linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, rgba(196, 196, 196, 0) 0.01%, rgba(0, 0, 0, 0.4) 100%)"
      position="relative"
    >
      <Flex justifyContent="center" alignItems="center" h="100%">
        <Image src={img} objectPosition="center" w={["60px", , , "auto"]} />
      </Flex>
      <Box textAlign="center" color="white">
        <Text fontSize="15px" fontWeight="600" mb="4px">
          {name}
        </Text>
        <Text fontSize={"13px"}>{returnType}</Text>
      </Box>
    </Box>
  );
};

export default PlanResponsive;
