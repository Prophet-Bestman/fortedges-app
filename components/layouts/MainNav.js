import { Box, Circle, Text, useDisclosure } from "@chakra-ui/react";
import { useGetCustomPlans } from "api/plans";
import { FundPlan } from "components/plansModals";
import Link from "next/link";
import { NavContext } from "providers/NavProvider";
import { planActions, PlanContext } from "providers/PlanProvider";
import React, { useContext, useEffect } from "react";
import { mainNavs } from "utils/navs";

const MainNav = () => {
  const { navState } = useContext(NavContext);
  const active = navState.name;

  const { dispatch: setPlan } = useContext(PlanContext);
  const { data: plansData, isLoading } = useGetCustomPlans();

  useEffect(() => {
    if (plansData !== undefined) {
      if (Object.keys(plansData)?.length > 0) {
        setPlan({
          type: planActions.SET_PLAN,
          payload: plansData?.custom_plans[0],
        });
      }
    }
  }, [plansData]);

  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box py="48px" w="full">
      <Link href="/">
        <Text
          fontFamily="Coustard"
          fontSize={["20px", null, null, "24px"]}
          color="app.primary"
          cursor="pointer"
          mb="52px"
          ml="40px"
        >
          Ubassets
        </Text>
      </Link>
      <Box display="flex" w="full">
        <Box ml="24px" w="full">
          {mainNavs.map((nav, i) => (
            <Link key={i} href={nav.link}>
              {nav?.name === "Add Money" && isLoading ? (
                <></>
              ) : (
                <Text
                  display="flex"
                  onClick={nav?.name === "Add Money" && onOpen}
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
              )}
            </Link>
          ))}
        </Box>
      </Box>

      {isOpen && <FundPlan isOpen={isOpen} onClose={onClose} />}
    </Box>
  );
};

export default MainNav;
