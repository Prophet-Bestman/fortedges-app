import { Box, Circle, Flex, Text } from "@chakra-ui/react";
import { Notification } from "components";
import { Padding } from "components/layouts";
import { notifications } from "data";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect } from "react";
import { AiOutlineDownload, AiOutlineUpload } from "react-icons/ai";

const Notifications = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.notifications,
    });
  }, []);

  const notification = notifications[0];

  return (
    <Box mt={["160", , , "130px"]}>
      <Padding>
        {notifications.map((notification, i) => (
          <Notification notification={notification} key={i} />
        ))}
      </Padding>
    </Box>
  );
};

export default Notifications;

Notifications.requireAuth = true;
