import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { NavContext, navStates } from "providers/NavProvider";
import React, { useContext } from "react";
import { mobileNavs } from "utils";

const MainMobileNav = ({ isOpen, onClose }) => {
  const { navState } = useContext(NavContext);
  const active = navState.name;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={true}
        motionPreset="slideInRight"
        size="full"
      >
        <ModalOverlay />
        <ModalContent py="24px">
          <ModalCloseButton
            _focus={{
              outline: "none",
            }}
            m="20px"
          />
          <ModalBody pt="90px">
            {/* <MainNav /> */}
            <Box
              pl="24px"
              borderBottomWidth="1px"
              borderBottomColor="#E2E0E0"
              pb="36px"
            >
              {mobileNavs.map((nav, i) => (
                <Text
                  key={i}
                  display="flex"
                  alignItems="center"
                  my="16px"
                  gap="8px"
                  color={active === nav.name ? "app.primary" : "text.dark"}
                  cursor="pointer"
                  _hover={{
                    color: "app.primary",
                  }}
                >
                  <img src={nav.icon} alt="" /> {nav.name}
                </Text>
              ))}
            </Box>
            <Box px="16px" pt="32px" color="text.black">
              <Text _hover={{ color: "app.primary" }} mb="16px">
                <Link href="#">Settings</Link>
              </Text>
              <Text _hover={{ color: "app.primary" }} mb="16px">
                <Link href="#">Help</Link>
              </Text>
              <Text
                _hover={{ color: "red.600" }}
                color="red.500"
                cursor="pointer"
              >
                Sign out
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MainMobileNav;
