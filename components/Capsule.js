import { Box } from "@chakra-ui/react";
import React from "react";

const Capsule = ({ children, color }) => {
  return (
    <Box
      rounded="full"
      bg="#7E8CA61A"
      py="5px"
      px="16px"
      w="fit-content"
      color={color}
    >
      {children}
    </Box>
  );
};

export default Capsule;
