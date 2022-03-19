import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { NavContext } from "providers/NavProvider";
import React, { useContext } from "react";
import { mainNavs } from "utils/navs";

const MainNav = () => {
  const { navState } = useContext(NavContext);
  const active = navState.name;
  return (
    <Box pl="40px" py="48px">
      <Text
        fontFamily="Coustard"
        fontSize={["20px", null, null, "24px"]}
        color="app.primary"
        cursor="pointer"
        mb="52px"
      >
        fortedges
      </Text>
      <Box display="flex">
        <Box ml="12px">
          {mainNavs.map((nav, i) => (
            <Link key={i} href={nav.link}>
              <Text
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
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MainNav;
