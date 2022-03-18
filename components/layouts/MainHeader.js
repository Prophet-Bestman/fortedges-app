import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import MainMobileNav from "./MainMobileNav";

const MainHeader = () => {
  const notificationCount = 10;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box position="absolute" top="0" left={0} w="full">
      <Box pt="48px" px="64px" display={["none", , , "block"]}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex gap="24px">
            <Flex
              bg="#F1F2F4"
              w="40px"
              h="40px"
              rounded="full"
              _hover={{
                bg: "gray.200",
              }}
              justifyContent="center"
              alignItems="center"
            >
              <BsArrowLeftShort fontSize="24px" />
            </Flex>

            <Text
              fontSize={["20px", null, "24px"]}
              color="text.black"
              fontWeight={600}
            >
              Overview
            </Text>
          </Flex>

          <Flex alignItems="center" gap="32px">
            {notificationCount > 0 && (
              <Box position="relative">
                <IoMdNotificationsOutline fontSize="28px" />

                <Flex
                  position="absolute"
                  top="-5px"
                  right="-5px"
                  w="18px"
                  h="18px"
                  color="white"
                  bg="red"
                  fontSize="10px"
                  justifyContent="center"
                  alignItems="center"
                  rounded="full"
                  fontWeight={600}
                >
                  {notificationCount}
                </Flex>
              </Box>
            )}
            <Menu gutter={10}>
              <MenuButton
                as="button"
                _hover={{
                  fontWeight: 600,
                }}
              >
                <Box w="48px" h="48px" rounded="full" bg="gray"></Box>
              </MenuButton>

              <MenuList p="24px" color="text.black" w="300px" outline="none">
                <Flex
                  flexDir="column"
                  justifyContent="center"
                  alignItems="center"
                  mb="28px"
                >
                  <Box
                    w="80px"
                    h="80px"
                    rounded="full"
                    bg="gray"
                    mb="16px"
                  ></Box>
                  <Text fontSize="16px" fontWeight={600}>
                    {"User’s name"}
                  </Text>
                  <Text fontSize="14px" color="text.grey" fontWeight={400}>
                    {"User’s Email Address"}
                  </Text>
                </Flex>
                <Box px="16px" pt="32px" color="text.black">
                  <Text _hover={{ color: "app.primary" }} mb="16px">
                    <Link href="#">Settings</Link>
                  </Text>
                  <Text _hover={{ color: "app.primary" }} mb="16px">
                    <Link href="#">Help</Link>
                  </Text>
                  <Text
                    _hover={{ color: "red.700" }}
                    color="red.500"
                    cursor="pointer"
                  >
                    Sign out
                  </Text>
                </Box>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>

      <Box
        display={["flex", , , "none"]}
        py="30px"
        justifyContent="space-between"
        pl="24px"
        pr="30px"
      >
        <Text>Logo</Text>
        <Box
          display={["block", null, null, "none"]}
          cursor="pointer"
          onClick={onOpen}
        >
          <AiOutlineMenu color="black" size="24px" />
          <MainMobileNav isOpen={isOpen} onClose={onClose} />
        </Box>
      </Box>
    </Box>
  );
};

export default MainHeader;
