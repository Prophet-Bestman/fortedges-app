import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { authNavs } from "utils";

const AuthMobileNav = ({ isOpen, onClose }) => {
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
        <ModalContent p="40px">
          <ModalCloseButton
            _focus={{
              outline: "none",
            }}
            m="20px"
          />
          <ModalBody my="90px">
            <Box>
              {authNavs.map((nav) => (
                <Box key={nav.name}>
                  {nav.dropDown !== undefined ? (
                    <Menu
                      _hover={{
                        color: "app.primary",
                      }}
                    >
                      <MenuButton
                        _hover={{
                          color: "app.primary",
                        }}
                        as="button"
                      >
                        <Text
                          mx={"24px"}
                          cursor="pointer"
                          display="flex"
                          alignItems="center"
                          mb="42px"
                          _hover={{
                            color: "app.primary",
                          }}
                        >
                          {nav.name} <AiOutlineArrowRight />
                        </Text>
                      </MenuButton>

                      <MenuList p="16px" pl="24px" m="0">
                        {nav.dropDown.map((item) => (
                          <MenuItem
                            key={item.name}
                            my="15px"
                            transition="ease-in-out"
                            _focus={{
                              backgroundColor: "#00000007",
                              color: "app.primary",
                            }}
                          >
                            <a href={item.link}>
                              <Text>{item.name}</Text>
                            </a>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  ) : (
                    <a key={nav.name} href={nav.link}>
                      <Box mb="42px">
                        <Text
                          _hover={{
                            color: "app.primary",
                          }}
                          mx={"24px"}
                          cursor="pointer"
                        >
                          {nav.name}
                        </Text>
                      </Box>
                    </a>
                  )}
                </Box>
              ))}
            </Box>
            <Flex
              // display={["none", null, null, "flex"]}
              borderTopColor="#D6D3D833"
              borderTopWidth={1}
              py="30px"
              align="center"
              gap="24px"
              color="text.black"
              fontSize="14px"
            >
              <Link href="/auth/signin">Sign In</Link>

              <Box maxW="110">
                <Link href="/auth/signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AuthMobileNav;
