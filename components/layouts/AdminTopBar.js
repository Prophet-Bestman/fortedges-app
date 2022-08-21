import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NavContext } from "providers/NavProvider";
import React, { useContext } from "react";
import { AiOutlineBell, AiOutlineClose, AiOutlineUser } from "react-icons/ai";
import { HiMenuAlt2 } from "react-icons/hi";
import AdminNav from "./AdminNav";

const AdminTopBar = () => {
  const { navState } = useContext(NavContext);
  const pageTitle = navState.pageTitle;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Box
        h="64px"
        d="flex"
        // justifyContent="space-between"
        w="full"
        alignItems="center"
        px="28px"
        fontSize={"24px"}
        gap="32px"
        bg="white"
      >
        <Box display={["block", , , "none"]}>
          <HiMenuAlt2 cursor="pointer" onClick={onOpen} />
        </Box>

        <Box
          ml="auto"
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
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <Box ml="auto" p="4" onClick={onClose} cursor="pointer">
            <AiOutlineClose size="22px" />
          </Box>

          <DrawerBody>
            <AdminNav />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AdminTopBar;
