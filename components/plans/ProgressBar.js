import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import React from "react";
import { formatter } from "utils";

const ProgressBar = ({ amount, progress, name, color, colorScheme }) => {
  return (
    <Box w="full">
      {/* Premium Stocks Progress Bar */}
      <Flex mb="10px" justify="space-between" w="full">
        <Text color="text.black">{name}</Text>
        <Text fontWeight="700" color={color}>
          {!!amount ? formatter.format(amount) : formatter.format(0)}
        </Text>
      </Flex>
      <Flex w="full" alignItems="center">
        <Progress
          flexGrow="1"
          value={progress}
          size="xs"
          colorScheme={colorScheme}
          rounded="full"
        />

        <Text fontSize="12px" color={color} ml="8px">
          {Math.ceil(progress)} %
        </Text>
      </Flex>
    </Box>
  );
};

export default ProgressBar;
