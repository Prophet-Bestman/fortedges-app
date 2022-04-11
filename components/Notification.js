import { Box, Circle, Flex, Text } from "@chakra-ui/react";
import { AiOutlineDownload, AiOutlineUpload } from "react-icons/ai";
import React from "react";

const Notification = ({ notification }) => {
  return (
    <Box
      alignItems={"center"}
      maxW="700px"
      py="20px"
      borderBottomWidth="1px"
      borderColor="#F1F2F4"
      px="12px"
      _hover={{
        bg: "#f9f9f9",
      }}
      borderRadius="xl"
    >
      <Flex gap={["12px", "16px"]} alignItems={"center"}>
        <Flex
          justify="center"
          alignItems="center"
          bg={"#F1F2F4"}
          rounded="md"
          h={["30px", "40px"]}
          w={["30px", "40px"]}
        >
          {notification.type === "Withdrawal" && (
            <AiOutlineUpload size="20px" />
          )}
          {notification.type === "Deposit" && <AiOutlineDownload size="20px" />}
        </Flex>

        <Text fontWeight={600} fontSize={["16px", , "20px"]} color="text.black">
          {notification.title}
        </Text>

        <Flex ml="auto" gap={["12px", "18px"]} alignItems="center">
          <Circle size="6px" bgColor={"green.400"}></Circle>
          <Text fontSize={["12px", , "14px"]}>{notification.date}</Text>
        </Flex>
      </Flex>

      <Text fontSize={["14px", , "16px"]} color="text.grey" pt="12px">
        You just Withdrawn $2,000.00 from your plan successfully
      </Text>
    </Box>
  );
};

export default Notification;