import { Box, Button, Flex } from "@chakra-ui/react";
import { useGetNotifications, useReadNotifications } from "api/notifications";
import { Notification } from "components";
import { Padding } from "components/layouts";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect, useState } from "react";
import { MdArrowForwardIos, MdOutlineArrowBackIos } from "react-icons/md";

const Notifications = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.notifications,
    });
  }, []);

  const { data: notificationData } = useGetNotifications(page);
  const { mutate: readNotifications } = useReadNotifications();

  useEffect(() => {
    readNotifications();
  }, []);

  useEffect(() => {
    if (notificationData !== undefined) {
      if (notificationData?.notifications?.length > 0) {
        setNotifications(notificationData.notifications);
        setPages(Math.ceil(notificationData?.total_documents / 10));
      } else {
        setPages(1);
        setNotifications([]);
      }
    }
  }, [notificationData]);
  return (
    <Box mt={["160", , , "130px"]}>
      <Padding>
        {notifications?.length > 0 &&
          notifications.map((notification, i) => (
            <Notification notification={notification} key={i} />
          ))}
        <Flex
          mt="30px"
          color="white"
          justifyContent="center"
          gap="12px"
          mb="48px"
        >
          <Button
            size="sm"
            px="4px"
            py="12px"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <MdOutlineArrowBackIos size="24px" />
          </Button>
          <Button
            size="sm"
            px="4px"
            py="12px"
            disabled={page === pages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <MdArrowForwardIos size="24px" color="white" />
          </Button>
        </Flex>
      </Padding>
    </Box>
  );
};

export default Notifications;

Notifications.requireAuth = true;
