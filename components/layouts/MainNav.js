import { Box, Circle, Image, Text, useDisclosure } from "@chakra-ui/react";
import UserSelectPlan from "components/overview/UserSelectPlan";
import Link from "next/link";
import { NavContext } from "providers/NavProvider";
import PlanProvider from "providers/PlanProvider";
import React, { useContext } from "react";
import { mainNavs } from "utils/navs";

const MainNav = () => {
  const { navState } = useContext(NavContext);
  const active = navState.name;

  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box py="48px" w="full">
      <Text
        fontFamily="Coustard"
        fontSize={["20px", null, null, "24px"]}
        color="app.primary"
        cursor="pointer"
        mb="52px"
        ml="40px"
      >
        fortedges
      </Text>
      <Box display="flex" w="full">
        <Box ml="24px" w="full">
          {mainNavs.map((nav, i) => (
            <Link key={i} href={nav.link}>
              <Text
                display="flex"
                onClick={nav?.name === "Fund A Plan" && onOpen}
                alignItems="center"
                mb="32px"
                w="full"
                gap="8px"
                fontSize="14px"
                textOverflow=""
                color={active === nav.name ? "app.primary" : "text.dark"}
                fontWeight={active === nav.name ? "600" : "400"}
                cursor="pointer"
                _hover={{
                  color: "app.primary",
                }}
              >
                <Circle size="32px" bg="#1D24410D">
                  {nav.icon}
                </Circle>
                {nav.name}
              </Text>
            </Link>
          ))}
        </Box>
      </Box>

      <PlanProvider>
        <UserSelectPlan isOpen={isOpen} onClose={onClose} />
      </PlanProvider>
    </Box>
  );
};

export default MainNav;
