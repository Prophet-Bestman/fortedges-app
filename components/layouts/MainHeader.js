import {
  Box,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsArrowLeftShort } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import MainMobileNav from "./MainMobileNav";
import { NavContext } from "providers/NavProvider";
import MobilePageTitle from "components/MobilePageTitle";
import { useRouter } from "next/router";
import { config } from "utils";
import { useGetUser } from "api/user";
import { useGetNotifications } from "api/notifications";
import { AuthContext, userActions } from "providers/AuthProvider";

const MainHeader = () => {
  const [notificationCount, setNotificationCount] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { navState } = useContext(NavContext);
  const { dispatch: logout } = useContext(AuthContext);
  const pageTitle = navState.pageTitle;
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [notificationsError, setNotificationsError] = useState("");

  const router = useRouter();
  const { data: userData, error } = useGetUser();

  useEffect(() => {
    let user;
    if (userData != undefined) {
      setUser(userData);
      user = JSON.stringify(userData);
      localStorage.setItem(config.key.user, user);
    } else {
    }
  }, [userData]);

  useEffect(() => {
    if (error != undefined) {
    } else {
    }
  }, [error]);

  const { data: notificationData } = useGetNotifications();

  // useEffect(() => {
  //   setNotificationsError(notiifyError);
  // }, [notiifyError]);

  useEffect(() => {
    if (notificationData !== undefined) {
      if (
        notificationData
          .toString()
          .includes("Request failed with status code 403")
      ) {
        setNotificationsError(notificationData);
        logout({ type: userActions.LOGOUT });
      }
      setNotifications(notificationData);
    } else {
      setNotificationsError(notificationData);
    }
  }, [notificationData]);

  return (
    <Box position="absolute" top="0" left={0} w="full">
      <Box
        pt="48px"
        px={["24px", null, "32px", , "64px"]}
        display={["none", , , "block"]}
      >
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
              <BsArrowLeftShort onClick={() => router.back()} fontSize="24px" />
            </Flex>

            <Text
              fontSize={["20px", null, "24px"]}
              color="text.black"
              fontWeight={600}
            >
              {pageTitle}
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

              <MenuList
                zIndex="popover"
                p="24px"
                color="text.black"
                w="300px"
                outline="none"
              >
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
                  {!!user && (
                    <>
                      <Text fontSize="16px" fontWeight={600}>
                        {`${user?.firstname} ${user?.lastname}`}
                      </Text>
                      <Text fontSize="14px" color="text.grey" fontWeight={400}>
                        {user?.email}
                      </Text>
                    </>
                  )}
                </Flex>
                <Box px="16px" pt="32px" color="text.black">
                  <Text _hover={{ color: "app.primary" }} mb="16px">
                    <Link href="/settings">Settings</Link>
                  </Text>
                  <Text _hover={{ color: "app.primary" }} mb="16px">
                    <Link href="#">Help</Link>
                  </Text>
                  <Text
                    _hover={{ color: "red.700" }}
                    color="red.500"
                    cursor="pointer"
                    onClick={() => {
                      logout({ type: userActions.LOGOUT });
                    }}
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
        <Image src="/img/fortedges_logo.svg" />
        <Box
          display={["block", null, null, "none"]}
          cursor="pointer"
          onClick={onOpen}
        >
          <AiOutlineMenu color="black" size="24px" />
          <MainMobileNav isOpen={isOpen} onClose={onClose} />
        </Box>
      </Box>
      {navState.pageTitle !== "Overview" && (
        <MobilePageTitle>{pageTitle}</MobilePageTitle>
      )}
    </Box>
  );
};

export default MainHeader;
