import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { NavContext } from "providers/NavProvider";
import React, { useContext } from "react";
import { mainNavs } from "utils/navs";

const MainNav = () => {
  const { navState } = useContext(NavContext);
  const active = navState.name;
  return (
    <Box pl="18px" py="48px" w="full">
      <Text
        fontFamily="Coustard"
        fontSize={["20px", null, null, "24px"]}
        color="app.primary"
        cursor="pointer"
        mb="52px"
      >
        fortedges
      </Text>
      <Box display="flex" w="full">
        <Box ml="12px" w="full">
          {mainNavs.map((nav, i) => (
            <Link key={i} href={nav.link}>
              <Text
                display="flex"
                alignItems="center"
                my="32px"
                w="full"
                gap="8px"
                textOverflow=""
                color={active === nav.name ? "app.primary" : "text.dark"}
                cursor="pointer"
                _hover={{
                  color: "app.primary",
                }}
              >
                <img src={nav.icon} alt="" /> <Text>{nav.name}</Text>
              </Text>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MainNav;
