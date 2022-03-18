import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const OverviewCard = ({ title, amount, gains, className }) => {
  return (
    <Box
      borderColor="#E2E6EB66"
      borderWidth="1px"
      bg="white"
      p="16px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      rounded="md"
      boxShadow="sm"
      flexDir="column"
      w="full"
      mt="26px"
      minW="180px"
      className={className}
    >
      <Text fontSize="14px" mb="8px" color="text.grey">
        Total Balance
      </Text>

      <Text fontSize={["28px"]} mb="32px">
        $2000.93
      </Text>

      {!gains && (
        <Flex gap="15px" alignItems="center">
          <Text fontSize="13px" color="text.grey">
            Total Gains
          </Text>
          <Text
            fontSize="13px"
            color="#4BD964"
            display="flex"
            alignItems="center"
            gap="4px"
          >
            <FiArrowUpRight /> 14%
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default OverviewCard;
