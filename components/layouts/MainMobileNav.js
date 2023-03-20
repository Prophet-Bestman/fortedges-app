import {
  Box,
  Circle,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useGetMops } from "api/mop";
import { useGetCustomPlans } from "api/plans";
import { FundPlan } from "components/plansModals";

import Link from "next/link";
import { AuthContext, userActions } from "providers/AuthProvider";
import { NavContext } from "providers/NavProvider";
import { planActions, PlanContext } from "providers/PlanProvider";

import React, { useContext, useEffect } from "react";
import { mobileNavs } from "utils";

const MainMobileNav = ({ isOpen, onClose }) => {
  const { navState } = useContext(NavContext);
  const active = navState.name;
  const { dispatch: logout } = useContext(AuthContext);
  const { dispatch: setPlan } = useContext(PlanContext);

  const { data: plansData, isLoading } = useGetCustomPlans();
  const { data: mopsResp, isLoading: loadingMops } = useGetMops();

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

  useEffect(() => {
    onClose();
  }, [active]);

  const {
    isOpen: isFundOpen,
    onClose: onFundClose,
    onOpen: onFundOpen,
  } = useDisclosure();

  const handleOpenFundModal = (nav) => {
    if (nav?.name === "Add Money") {
      // onClose();
      onFundOpen();
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        motionPreset="slideInRight"
        size="full"
      >
        <ModalOverlay />
        <ModalContent py="24px">
          <ModalCloseButton
            _focus={{
              outline: "none",
            }}
            m="20px"
          />
          <ModalBody pt="90px">
            {/* <MainNav /> */}
            <Box
              pl="24px"
              borderBottomWidth="1px"
              borderBottomColor="#E2E0E0"
              pb="36px"
            >
              {mobileNavs.map((nav, i) => (
                <Link href={nav.link} key={i}>
                  {nav?.name === "Add Money" && (isLoading || loadingMops) ? (
                    <></>
                  ) : (
                    <Text
                      onClick={() => handleOpenFundModal(nav)}
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
                      <Circle size="32px" bg="#1D24410D">
                        <Image w="20px" src={nav.icon} alt="" />
                      </Circle>{" "}
                      {nav.name}
                    </Text>
                  )}
                </Link>
              ))}
            </Box>
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
                _hover={{ color: "red.600" }}
                color="red.500"
                cursor="pointer"
                onClick={() => {
                  logout({ type: userActions.LOGOUT });
                }}
              >
                Sign out
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>

        {isFundOpen && (
          <FundPlan
            isOpen={isFundOpen}
            onClose={onFundClose}
            options={mopsResp}
          />
        )}
      </Modal>
    </div>
  );
};

export default MainMobileNav;
