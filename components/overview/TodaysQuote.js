import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";

const TodaysQuote = () => {
  return (
    <Box
      w="full"
      maxW="490px"
      bg="#358A91"
      bgGradient=" linear-gradient(359.24deg, rgba(0, 0, 0, 0.2) 0.57%, rgba(255, 255, 255, 0) 99.27%, rgba(0, 0, 0, 0) 99.27%)"
      p="16px"
      rounded="2xl"
    >
      <Text fontSize="13px" color="white" textTransform="uppercase" mb="12px">
        {"Today’s Qoute"}
      </Text>
      <FaQuoteLeft color="#FFFFFF4D" />

      <Text my="12px" color="white">
        People who invest make money for themselves; people who speculate make
        money for their brokers.
      </Text>

      <Flex
        maxW="300px"
        justifyContent="space-between"
        alignItems="center"
        w="full"
      >
        <Text
          font="600"
          color="white"
          fontWeight={600}
          textTransform="capitalize"
          fontSize="13px"
        >
          Benjamin graham
        </Text>
        <Flex
          w="40px"
          h="40px"
          bg="#FFFFFF4D"
          rounded="full"
          justifyContent="center"
          alignItems="center"
        >
          <HiOutlineShare color="white" fontSize="20px" />
        </Flex>
      </Flex>
    </Box>
  );
};

export default TodaysQuote;
