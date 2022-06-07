import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineArrowDown, AiOutlineMenu } from "react-icons/ai";
import { authNavs } from "utils";
import AuthMobileNav from "./AuthMobileNav";

const AuthNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box display="flex" justifyContent="center">
      <Box
        maxW="2000px"
        w="full"
        zIndex="sticky"
        display="flex"
        justifyContent="space-between"
        position={"absolute"}
        top={"Plans"}
        alignItems="center"
        px={["24px", null, "64px", null, "180px", "208px"]}
        h={["80px", null, "101px"]}
      >
        <Box>
          <Link href="/">
            <Text
              fontFamily="Coustard"
              fontSize={["24px", null, null, "28px"]}
              color="white"
              cursor="pointer"
            >
              Ubassets
            </Text>
          </Link>
        </Box>
        <Box display={["none", null, null, "flex"]} fontSize="14px">
          {authNavs.map((nav) => (
            <Box
              key={nav.name}
              color="white"
              //   _hover={{
              //     color: active === nav.name ? "brand.primary" : "brand.primary",
              //   }}
            >
              {nav.dropDown !== undefined ? (
                <Menu
                  gutter={0}
                  _hover={{
                    fontWeight: 600,
                  }}
                >
                  <MenuButton
                    as="button"
                    _hover={{
                      fontWeight: 600,
                    }}
                  >
                    <Text
                      _hover={{
                        fontWeight: 600,
                      }}
                      fontWeight={500}
                      mx={"24px"}
                      cursor="pointer"
                      display="flex"
                      alignItems="center"
                    >
                      {nav.name} <AiOutlineArrowDown />
                    </Text>
                  </MenuButton>

                  <MenuList p="16px" pl="24px" color="text.black">
                    {nav.dropDown.map((item) => (
                      <MenuItem
                        key={item.name}
                        my="5px"
                        transition="ease-in-out"
                        _focus={{
                          backgroundColor: "#00000007",
                          fontWeight: "600",
                          color: "app.primary",
                        }}
                      >
                        <Link href={item.link}>
                          <Text>{item.name}</Text>
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              ) : (
                <Link key={nav.name} href={nav.link}>
                  <Box>
                    <Text
                      color="white"
                      // fontWeight={active === nav.name ? "bold" : "500"}
                      fontWeight={500}
                      mx={"24px"}
                      _hover={{
                        fontWeight: 600,
                      }}
                      cursor="pointer"
                    >
                      {nav.name}
                    </Text>
                  </Box>
                </Link>
              )}
            </Box>
          ))}
        </Box>

        <Flex
          display={["none", null, null, "flex"]}
          align="center"
          gap="24px"
          color="white"
          fontSize="14px"
        >
          <Link href="#">
            <Text color="white">Sign In</Text>
          </Link>

          <Box maxW="110">
            <Button bg="white" variant="secondary" size="sm">
              Get Started
            </Button>
          </Box>
        </Flex>

        <Box
          display={["block", null, null, "none"]}
          cursor="pointer"
          onClick={onOpen}
        >
          <AiOutlineMenu color="white" size="24px" />
          <AuthMobileNav isOpen={isOpen} onClose={onClose} />
        </Box>
      </Box>
    </Box>
  );
};

export default AuthNav;
