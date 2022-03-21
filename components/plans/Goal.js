import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

const Goal = ({ goal }) => {
  const { action, img, color } = goal;
  return (
    <Box
      bgColor={color}
      bgRepeat="no-repeat"
      w="full"
      maxW={"170px"}
      h="195px"
      p="16px"
      display="flex"
      flexDir="column"
      justifyContent="center"
      borderRadius="12px"
      bgGradient="linear-gradient(180deg, rgba(196, 196, 196, 0) 0%, rgba(196, 196, 196, 0) 0.01%, rgba(0, 0, 0, 0.4) 100%)"
      position="relative"
    >
      <Flex justifyContent="center" alignItems="center" h="100%">
        <Image src={img} objectPosition="center" w={["60px"]} />
      </Flex>
      <Box textAlign="center" color="white">
        <Text fontSize={"13px"}>{action}</Text>
        <BsArrowRightShort />
      </Box>
    </Box>
  );
};

export default Goal;