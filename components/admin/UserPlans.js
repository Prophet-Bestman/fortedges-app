import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { Padding } from "components/layouts";
import { OverviewPlans } from "data";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import UserPlan from "./UserPlan";
import { useAdminGetCustomPlans } from "api/plans";

const UserPlans = ({ userID }) => {
  const [userPlans, setUserPlans] = useState([]);

  const { data: plansData } = useAdminGetCustomPlans(userID);

  useEffect(() => {
    if (plansData !== undefined) {
      if (Object.keys(plansData).length > 0) {
        setUserPlans(plansData.custom_plans);
      }
    }
  }, [plansData]);

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
            <Box maxW={["90vw", , , , "70vw"]}>
              <Swiper
                slidesPerView={2}
                spaceBetween={10}
                pagination={{
                  clickable: true,
                }}
                breakpoints={{
                  767: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 5,
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
                {!!userPlans &&
                  userPlans?.length > 0 &&
                  userPlans?.map((plan, i) => (
                    <SwiperSlide key={i}>
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
