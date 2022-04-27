import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { formatter } from "utils";

const OverviewCard = ({ title, amount, gains, className }) => {
  const profit = (gains / amount) * 100;
  amount = formatter.format(amount);
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
      minH="167px"
      mt="26px"
      minW="180px"
      className={className}
    >
      <Text fontSize="14px" mb="8px" color="text.grey">
        {title}
      </Text>

      <Text fontSize={["28px"]} mb="32px">
        {amount}
      </Text>

      {gains && (
        <Flex gap="5px" alignItems="center">
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
            <FiArrowUpRight /> {profit.toFixed(3)} %
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default OverviewCard;
