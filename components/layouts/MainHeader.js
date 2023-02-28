import {
  Avatar,
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
import PlanProvider from "providers/PlanProvider";
import UserSelectPlan from "components/overview/UserSelectPlan";

const MainHeader = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { navState } = useContext(NavContext);
  const { dispatch: logout } = useContext(AuthContext);
  const { dispatch, user } = useContext(AuthContext);
  const pageTitle = navState.pageTitle;
  // const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [notificationsError, setNotificationsError] = useState("");

  const router = useRouter();
  const { data: userData, error } = useGetUser();

  const {
    isOpen: isFundOpen,
    onClose: onFundClose,
    onOpen: onFundOpen,
  } = useDisclosure();

  useEffect(() => {
    // let user;
    if (userData !== undefined) {
      dispatch({ type: userActions.LOGIN, payload: userData });
      // user = JSON.stringify(userData);
      // localStorage.setItem(config.key.user, user);
    } else {
    }
  }, [userData]);

  useEffect(() => {
    if (error != undefined) {
    } else {
    }
  }, [error]);

  const { data: notificationData } = useGetNotifications(1, 10000);

  useEffect(() => {
    if (notificationData !== undefined) {
      if (
        notificationData
          .toString()
          .includes("Request failed with status code 403")
      ) {
        setNotificationsError(notificationData);
        dispatch({ type: userActions.LOGOUT });
      } else setNotifications(notificationData.notifications);
    }
  }, [notificationData]);

  useEffect(() => {
    if (notifications !== undefined) {
      if (notifications?.length > 0) {
        const readNotifications = notifications.filter(
          (notification) => notification?.is_read === false
        );
        setNotificationCount(readNotifications.length);
      }
    }
  }, [notifications]);

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
              cursor="pointer"
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
            <Link href="/notifications">
              <Box position="relative" cursor="pointer">
                <IoMdNotificationsOutline fontSize="28px" />
                {notificationCount > 0 && (
                  <Flex
                    position="absolute"
                    top="-5px"
                    right="-5px"
                    w="20px"
                    h="20px"
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
                )}
              </Box>
            </Link>
            <Menu gutter={10}>
              <MenuButton
                as="button"
                _hover={{
                  fontWeight: 600,
                }}
              >
                {/* <Box w="48px" h="48px" rounded="full" bg="gray"></Box> */}
                <Avatar
                  mr="24px"
                  src={user?.display_picture?.path}
                  size="lg"
                  name={`${user?.firstname} ${user?.lastname}`}
                />
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
                  <Avatar
                    mr="24px"
                    src={user?.display_picture?.path}
                    size="xl"
                    mb="16px"
                    name={`${user?.firstname} ${user?.lastname}`}
                  />
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
                    <a
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_LANDING_URL}/support`}
                      rel="noreferrer"
                    >
                      Support
                    </a>
                  </Text>
                  <Text
                    _hover={{ color: "red.700" }}
                    color="red.500"
                    cursor="pointer"
                    onClick={() => {
                      dispatch({ type: userActions.LOGOUT });
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
        pt="30px"
        justifyContent="space-between"
        pl="24px"
        pr="30px"
      >
        <Link href="/">
          <Image src="/img/fortedges_logo.svg" />
        </Link>
        <Box
          display={["block", null, null, "none"]}
          cursor="pointer"
          onClick={onOpen}
        >
          <AiOutlineMenu color="black" size="24px" />
          <PlanProvider>
            <MainMobileNav
              isOpen={isOpen}
              onClose={onClose}
              onFundOpen={onFundOpen}
            />
          </PlanProvider>
        </Box>
      </Box>
      {navState.pageTitle !== "Overview" && (
        <MobilePageTitle>{pageTitle}</MobilePageTitle>
      )}

      {/* <PlanProvider>
        <UserSelectPlan isOpen={isFundOpen} onClose={onFundClose} />
      </PlanProvider> */}
    </Box>
  );
};

export default MainHeader;
