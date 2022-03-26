import { Box, Circle, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { NavContext } from "providers/NavProvider";
import React, { useContext } from "react";
import { mainNavs } from "utils/navs";

const MainNav = () => {
  const { navState } = useContext(NavContext);
  const active = navState.name;
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
                alignItems="center"
                mb="32px"
                w="full"
                gap="8px"
                fontSize="14px"
                textOverflow=""
                color={active === nav.name ? "app.primary" : "text.dark"}
                cursor="pointer"
                _hover={{
                  color: "app.primary",
                }}
              >
                <Circle size="32px" bg="#1D24410D">
                  <Image w="20px" src={nav.icon} alt="" />
                </Circle>
                {nav.name}
              </Text>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MainNav;
