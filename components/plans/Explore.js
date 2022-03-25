import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { explorePlans, goalModalProps, goals } from "data";
import React, { useState } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Goal from "./Goal";
import PlanResponsive from "./PlanResponsive";
import { MdArrowForwardIos } from "react-icons/md";
import {
  GoalsPlan,
  PremiumPlan,
  RealEstatePlan,
  SubmitGoal,
  SubmitPlan,
} from "components/plansModals";
import Link from "next/link";

const Explore = () => {
  const [goalProps, setGoalProps] = useState(goalModalProps.fixedIncome);
  const [submitPlanOpen, setSubmitPlanOpen] = useState(false);

  const {
    isOpen: isPremiumOpen,
    onClose: onPremiumClose,
    onOpen: onPremiumOpen,
  } = useDisclosure();
  const {
    isOpen: isRealEstateOpen,
    onClose: onRealEstateClose,
    onOpen: onRealEstateOpen,
  } = useDisclosure();

  const {
    isOpen: isGoalOpen,
    onClose: onGoalClose,
    onOpen: onGoalOpen,
  } = useDisclosure();

  const handlePlan = (name) => {
    console.log("clicked");
    if (name === "Premium Stocks") {
      console.log("is Premium Stocks");
      onPremiumOpen();
    } else if (name === "Real Estate") {
      console.log("is Premium Stocks");
      onRealEstateOpen();
    } else onGoalOpen();
  };

  const handleGoal = (goalAction) => {
    switch (goalAction) {
      case goalModalProps.ownYourHome.title:
        setGoalProps(goalModalProps.ownYourHome);
        break;
      case goalModalProps.planWedding.title:
        setGoalProps(goalModalProps.planWedding);
        break;
      case goalModalProps.saveForRent.title:
        setGoalProps(goalModalProps.saveForRent);
        break;
      case goalModalProps.saveForSchool.title:
        setGoalProps(goalModalProps.saveForSchool);
        break;
      case goalModalProps.startBusiness.title:
        setGoalProps(goalModalProps.startBusiness);
        break;
      case goalModalProps.travel.title:
        setGoalProps(goalModalProps.travel);
        break;

      default:
        setGoalProps(goalModalProps.fixedIncome);
        break;
    }

    onGoalOpen();
  };

  return (
    <Box py="64px">
      <Box py="16px" borderBottomWidth="1px" borderBottomColor="#E7E8ED">
        <Text mb="9px" fontSize="20px" color="text.black" fontWeight="600">
          Explore Plans
        </Text>
        <Text fontSize="14px" color="text.grey">
          Tap on any type of the plans/goals to get started
        </Text>
      </Box>
      <Box
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
      </Box>

      <Box>
        <Swiper
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
        >
          {explorePlans.map((plan) => (
            <SwiperSlide
              style={{
                cursor: "pointer",
              }}
              onClick={() => handlePlan(plan.name)}
              key={plan.name}
            >
              <PlanResponsive plan={plan} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box>
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
            <Text mb="9px" fontSize="20px" color="text.black" fontWeight="600">
              Goals
            </Text>
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
          >
            <Text cursor="pointer">
              <Link href="/myplans/create">See All</Link>
            </Text>
            <MdArrowForwardIos fontSize="12px" />
          </Box>
        </Flex>

        <Flex
          display={["none", , "flex"]}
          flexWrap="wrap"
          gap="10px"
          justify="center"
        >
          {goals.map((goal) => (
            <Goal
              handleGoal={() => handleGoal(goal.action)}
              key={goal.action}
              goal={goal}
            />
          ))}
        </Flex>

        <Flex display={["flex", , "none"]} gap="12px" justify="center">
          {goals.slice(0, 2).map((goal) => (
            <Goal
              handleGoal={() => handleGoal(goal.action)}
              key={goal.action}
              goal={goal}
            />
          ))}
        </Flex>
      </Box>
      <PremiumPlan isOpen={isPremiumOpen} onClose={onPremiumClose} />
      <RealEstatePlan isOpen={isRealEstateOpen} onClose={onRealEstateClose} />
      <GoalsPlan
        isOpen={isGoalOpen}
        onClose={onGoalClose}
        goalProps={goalProps}
      />
      <SubmitPlan />
      <SubmitGoal />
    </Box>
  );
};

export default Explore;
