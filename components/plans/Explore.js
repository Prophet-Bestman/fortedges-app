import { Box, Flex, Grid, Text, useDisclosure } from "@chakra-ui/react";
import { goalModalProps, goals } from "data";
import React, { useState, useEffect, useContext } from "react";
// import { Pagination } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import Goal from "./Goal";
import PlanResponsive from "./PlanResponsive";
// import { MdArrowForwardIos } from "react-icons/md";
// import { GoalsPlan, SubmitGoal, SubmitPlan } from "components/plansModals";
// import Link from "next/link";
import { useGetAllPlans } from "api/plans";
import { config } from "utils";
import { AuthContext } from "providers/AuthProvider";
import WelcomeModal from "./WelcomeModal";

const Explore = () => {
  const [explorePlans, setExplorePlans] = useState([]);
  const [fetchErr, setFetchErr] = useState("");

  const { onClose } = useDisclosure();

  const { user } = useContext(AuthContext);

  const { data: plansData, error } = useGetAllPlans();

  useEffect(() => {
    setExplorePlans([]);
    if (plansData !== undefined) {
      if (plansData !== explorePlans) {
        const plans = plansData;
        setExplorePlans(plans);
        const goal = plansData.filter((plan) => plan.name === "Fixed Income");
        localStorage.setItem(config.key.parentID, goal[0]._id);
      }
    }
  }, [plansData]);

  useEffect(() => {
    if (error !== undefined) setFetchErr(error);
  }, [error]);

  return (
    <Box pb="64px" w="full">
      {/* <Box py="16px" borderBottomWidth="1px" borderBottomColor="#E7E8ED">
        <Text mb="9px" fontSize="20px" color="text.black" fontWeight="600">
          Choose a plan
        </Text>
      </Box> */}
      {/* <Box
        py="16px"
        borderBottomWidth="1px"
        borderBottomColor="#E7E8ED"
        mt="36px"
        mb="40px"
      >
        <Text mb="9px" fontSize="20px" color="text.black" fontWeight="600">
          Assets Class
        </Text>
        <Text fontSize="14px" color="text.grey">
          Tap on any type of the plans to create a new plan.
        </Text>
      </Box> */}

      {!!plansData && plansData.length > 0 && (
        <Flex
          // templateColumns={["repeat(3, 1fr)"]}
          w="full"
          gap="6"
          flexDir={["column", , , "row"]}
          flexWrap="wrap"
          mt="5"
          // justify="center"
        >
          {/* <Swiper
            slidesPerView={2}
            spaceBetween={10}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              767: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            modules={[Pagination]}
            className="mySwiper"
            style={{
              paddingBottom: "50px",
              width: "full",
            }}
          > */}
          {!!plansData &&
            plansData?.length > 0 &&
            plansData.map((plan) => (
              <PlanResponsive plan={plan} key={plan._id} />
            ))}
          {/* </Swiper> */}
        </Flex>
      )}
      <Box w="full">
        {/* <Text mb="9px" fontSize="20px" color="text.black" fontWeight="600">
          Goals
        </Text>
        <Flex
          justifyContent="space-between"
          alignItems="center"
          py="16px"
          borderBottomWidth="1px"
          borderBottomColor="#E7E8ED"
          mt="36px"
          mb="40px"
        >
          <Box>
            <Text fontSize="14px" color="text.grey">
              Tap on any type of the plans to create a new plan.
            </Text>
          </Box>

          <Box
            textAlign="center"
            display={["flex", , "none"]}
            color="text.black"
            alignItems="center"
            gap="8px"
            w="150px"
            flexGrow="1"
            justifyContent="end"
          >
            <Link href="/myplans/create">
              <Text
                cursor="pointer"
                textAlign={"end"}
                d="flex"
                alignItems="center"
              >
                See All
                <MdArrowForwardIos fontSize="12px" />
              </Text>
            </Link>
          </Box>
        </Flex> */}

        {/* LARGE SCREENS VIEW */}
        {/* <Flex
          display={["none", , "flex"]}
          flexWrap="wrap"
          gap="10px"
          justify="center"
        >
          {goals?.length > 0 &&
            goals.map((goal) => <Goal key={goal.action} goal={goal} />)}
        </Flex> */}

        {/* MOBILE VIEW */}

        {/* <Flex display={["flex", , "none"]} gap="12px" justify="center">
          {goals.slice(0, 2).map((goal) => (
            <Goal key={goal.action} goal={goal} />
          ))}
        </Flex> */}
      </Box>
      {/* <GoalsPlan
        isOpen={isGoalOpen}
        onClose={onGoalClose}
        goalProps={goalProps}
      /> */}
      {/* <SubmitPlan /> */}

      <WelcomeModal
        isOpen={!user?.has_plan && window.innerWidth > 700}
        onClose={onClose}
        plans={plansData}
      />
    </Box>
  );
};

export default Explore;
