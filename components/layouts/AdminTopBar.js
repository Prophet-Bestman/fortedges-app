import { Box, Text } from "@chakra-ui/react";
import { NavContext } from "providers/NavProvider";
import React, { useContext } from "react";
import { AiOutlineBell, AiOutlineUser } from "react-icons/ai";

const AdminTopBar = () => {
  const { navState } = useContext(NavContext);
  const pageTitle = navState.pageTitle;
  return (
    <Box>
      <Box
        h="64px"
        d="flex"
        justifyContent="end"
        w="full"
        alignItems="center"
        px="28px"
        fontSize={"24px"}
        gap="32px"
        bg="white"
      >
        <Box
          _hover={{
            transform: "scale(115%)",
            fontWeight: "bold",
          }}
        >
          <AiOutlineBell />
        </Box>
        <Box
          _hover={{
            transform: "scale(115%)",
            fontWeight: "bold",
          }}
        >
          <AiOutlineUser />
        </Box>
      </Box>
      {pageTitle && (
        <Box py="24px" px="24px">
          <Text fontSize="34px" fontWeight={600}>
            {pageTitle}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default AdminTopBar;
