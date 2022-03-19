import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Padding } from "./layouts";

const MobilePageTitle = ({ children }) => {
  return (
    <Padding>
      <Box
        display={["flex", , , "none"]}
        mt="32px"
        mb="24px"
        alignItems="center"
      >
        <AiOutlineArrowLeft fontSize="20px" />
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
