import {
  Box,
  Circle,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { landingUrl } from "api/baseUrls";
import Link from "next/link";
import { AuthContext, userActions } from "providers/AuthProvider";
import { NavContext } from "providers/NavProvider";

import React, { useContext, useEffect } from "react";
import { mobileNavs } from "utils";

const MainMobileNav = ({ isOpen, onClose, onFundOpen }) => {
  const { navState } = useContext(NavContext);
  const active = navState.name;
  const { dispatch: logout } = useContext(AuthContext);

  useEffect(() => {
    onClose();
  }, [active]);

  const handleOpenFundModal = (nav) => {
    if (nav?.name === "Fund A Plan") {
      onClose();
      onFundOpen();
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
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
                <Link href={nav.link} key={i}>
                  <Text
                    onClick={() => handleOpenFundModal(nav)}
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
                    <Circle size="32px" bg="#1D24410D">
                      <Image w="20px" src={nav.icon} alt="" />
                    </Circle>{" "}
                    {nav.name}
                  </Text>
                </Link>
              ))}
            </Box>
            <Box px="16px" pt="32px" color="text.black">
              <Text _hover={{ color: "app.primary" }} mb="16px">
                <Link href="/settings">Settings</Link>
              </Text>
              <Text _hover={{ color: "app.primary" }} mb="16px">
                <Link href={`${landingUrl}/support`}>Support</Link>
              </Text>
              <Text
                _hover={{ color: "red.600" }}
                color="red.500"
                cursor="pointer"
                onClick={() => {
                  logout({ type: userActions.LOGOUT });
                }}
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
