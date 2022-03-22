import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const PlanBalance = () => {
  return (
    <Box my="24px">
      <Text
        fontSize={"12px"}
        color="text.grey"
        py="6px"
        textAlign="center"
        bg="#F2F3F5"
        rounded="full"
      >
        Return are updated every weekday
      </Text>

      <Flex
        justify={["center", , "space-between"]}
        alignItems={["center", , "center"]}
        flexDir={["column", , "row"]}
        my="40px"
      >
        <Box my="12px">
          <Text
            fontSize={"14px"}
            color="text.grey"
            mb="4px"
            textAlign={["center", , "start"]}
          >
            Plan Balance
          </Text>
          <Text color="text.black" fontSize={"24px"} fontWeight="600">
            $12,831.07
          </Text>
        </Box>
        <Box my="12px" display={["none", , "block"]}>
          <Text
            fontSize={"14px"}
            color="text.grey"
            mb="4px"
            textAlign={["center", , "start"]}
          >
            Total Deposit
          </Text>
          <Text color="text.black" fontSize={"24px"} fontWeight="600">
            $12,831.07
          </Text>
        </Box>
        <Box my="12px">
          <Text
            fontSize={"12px"}
            color="text.grey"
            mb="4px"
            textAlign={["center", , "start"]}
          >
            Profits
          </Text>
          <Text color="text.green" fontSize={"13px"}>
            +4,019.12 | + 32 %
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default PlanBalance;
