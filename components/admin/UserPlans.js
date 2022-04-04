import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { Padding } from "components/layouts";
import { OverviewPlans } from "data";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import UserPlan from "./UserPlan";

const UserPlans = () => {
  return (
    <Box>
      <Padding>
        <Grid
          templateColumns={["repeat(1, 1fr)", , , "repeat(3, 1fr)"]}
          gap="14px"
        >
          <GridItem colSpan={3}>
            <Text fontSize={["16px", "18px", "20px", "24px"]} mb="24px">
              User Plans
            </Text>
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
                    <UserPlan plan={plan} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </GridItem>
        </Grid>
      </Padding>
    </Box>
  );
};

export default UserPlans;
