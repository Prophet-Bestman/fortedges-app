import { Box, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Padding } from "./layouts";

const MobilePageTitle = ({ children }) => {
  const router = useRouter();
  return (
    <Padding>
      <Box
        display={["flex", , , "none"]}
        mt="32px"
        // mb="24px"
        alignItems="center"
        pos="relative"
      >
        <Box pos="absolute" left={4}>
          <AiOutlineArrowLeft onClick={() => router.back()} fontSize="20px" />
        </Box>
        <Text
          mx="auto"
          fontSize="24px"
          color="text.black"
          textAlign="center"
          fontWeight={600}
        >
          {children}
        </Text>
      </Box>
    </Padding>
  );
};

export default MobilePageTitle;
