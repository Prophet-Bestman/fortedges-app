import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { YourPlans } from "components/overview";
import OverviewPlan from "components/overview/OverviewPlan";
import { OverviewPlans } from "data";
import Link from "next/link";
import React from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import PlanLarge from "./PlanLarge";

const PlansTab = () => {
  return (
    <Box>
      <Text mt="65px" mb="40px" fontSize="20px">
        Plans
      </Text>
      {/* Only on mobile */}
      <Box display={["block", , "none"]}>
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
          {OverviewPlans.map((plan) => (
            <SwiperSlide key={plan.name}>
              <OverviewPlan plan={plan} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Only on desktop */}
      <Box display={["none", , "block"]}>
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
          {OverviewPlans.map((plan) => (
            <SwiperSlide key={plan.name}>
              <PlanLarge plan={plan} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default PlansTab;
