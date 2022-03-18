import { Box, Text } from "@chakra-ui/react";
import { NavContext } from "providers/NavProvider";
import React, { useContext } from "react";
import { mainNavs } from "utils/navs";

const MainNav = () => {
  const { navState: active } = useContext(NavContext);
  return (
    <Box px="40px" py="48px">
      <Text
        fontFamily="Coustard"
        fontSize={["20px", null, null, "24px"]}
        color="app.primary"
        cursor="pointer"
        mb="52px"
      >
        fortedges
      </Text>
      <Box display="flex" justifyContent="center">
        <Box>
          {mainNavs.map((nav, i) => (
            <Text
              key={i}
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
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MainNav;
