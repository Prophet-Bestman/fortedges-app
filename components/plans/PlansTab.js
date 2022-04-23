import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { YourPlans } from "components/overview";
import OverviewPlan from "components/overview/OverviewPlan";
import Link from "next/link";
import React from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import PlanLarge from "./PlanLarge";

const PlansTab = ({ plans }) => {
  return (
    <Box w="full">
      <Text mt="65px" mb="40px" fontSize="20px">
        Plans
      </Text>
      {/* Only on mobile */}
      <Box display={["block", , "none"]} w="full">
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            767: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
          style={{
            paddingBottom: "50px",
            width: "full",
          }}
        >
          <SwiperSlide>
            <Flex justifyContent="center" h="full" w="full">
              <Link href="/myplans/create">
                <Image src="/img/create_plan.png" h="196px" />
              </Link>
            </Flex>
          </SwiperSlide>
          {!!plans &&
            plans.map((plan) => (
              <SwiperSlide key={plan._id}>
                <OverviewPlan plan={plan} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>

      {/* Only on desktop */}
      <Box display={["none", , "block"]} w="full">
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            767: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
          style={{
            paddingBottom: "50px",
            width: "full",
          }}
        >
          {!!plans &&
            plans.map((plan) => (
              <SwiperSlide key={plan._id}>
                <PlanLarge plan={plan} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default PlansTab;
