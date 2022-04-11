import { Box, Circle, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { NavContext } from "providers/NavProvider";
import React, { useContext } from "react";
import { adminNavs } from "utils/navs";

const AdminNav = () => {
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
        <Box ml="40px" w="full">
          {adminNavs.map((nav, i) => (
            <Link key={i} href={nav.link}>
              <Text
                mb="30px"
                w="full"
                fontSize="15px"
                textOverflow=""
                color={active === nav.name ? "text.black" : "text.grey"}
                fontWeight={active === nav.name ? "600" : "400"}
                cursor="pointer"
                _hover={{
                  color: "text.black",
                }}
              >
                {nav.name}
              </Text>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminNav;
