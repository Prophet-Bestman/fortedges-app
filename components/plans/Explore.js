import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { explorePlans, goals } from "data";
import React, { useContext } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Goal from "./Goal";
import PlanResponsive from "./PlanResponsive";
import { MdArrowForwardIos } from "react-icons/md";
import { PremiumPlan, RealEstatePlan } from "components/plansModals";

const Explore = () => {
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

  const handlePlan = (name) => {
    console.log("clicked");
    if (name === "Premium Stocks") {
      console.log("is Premium Stocks");
      onPremiumOpen();
    }
    if (name === "Real Estate") {
      console.log("is Premium Stocks");
      onRealEstateOpen();
    }
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
            <Text>See All</Text>
            <MdArrowForwardIos fontSize="12px" />
          </Box>
        </Flex>

        <Flex
          display={["none", , "flex"]}
          flexWrap="wrap"
          gap="12px"
          justify="center"
        >
          {goals.map((goal) => (
            <Goal key={goal.action} goal={goal} />
          ))}
        </Flex>

        <Flex display={["flex", , "none"]} gap="12px" justify="center">
          {goals.slice(0, 2).map((goal) => (
            <Goal key={goal.action} goal={goal} />
          ))}
        </Flex>
      </Box>
      <PremiumPlan isOpen={isPremiumOpen} onClose={onPremiumClose} />
      <RealEstatePlan isOpen={isRealEstateOpen} onClose={onRealEstateClose} />
    </Box>
  );
};

export default Explore;
