import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { Padding } from "components/layouts";
import { OverviewPlans } from "data";
import React from "react";
import OverviewPlan from "./OverviewPlan";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { IoMdTime } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

const YourPlans = () => {
  return (
    <Box my="64px">
      <Padding>
        <Grid
          templateColumns={["repeat(1, 1fr)", , , "repeat(3, 1fr)"]}
          gap="14px"
        >
          <GridItem colSpan={2}>
            <Text fontSize={["16px", "18px", "20px", "24px"]} mb="24px">
              Your Plans
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
                    <OverviewPlan plan={plan} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </GridItem>
          <GridItem
            colSpan={1}
            px="14px"
            borderLeftColor="#E2E0E0"
            borderLeftWidth="1px"
          >
            <Text
              fontSize={["16px", "18px", "20px", "24px"]}
              pb="24px"
              borderBottomColor="#E2E0E0"
              borderBottomWidth="1px"
            >
              Setup Guide
            </Text>

            <Box>
              <Link href="#">
                <Box
                  color="text.grey"
                  display="flex"
                  p="8px"
                  mt="8px"
                  cursor="pointer"
                  _hover={{ bg: "gray.50" }}
                  alignItems="center"
                >
                  <IoMdTime fontSize="32px" />
                  <Box ml="18px" mr="auto">
                    <Text mb="4px" color="text.black">
                      Verify your ID
                    </Text>
                    <Text fontSize="14px">We need to know who you are.</Text>
                  </Box>
                  <MdOutlineKeyboardArrowRight fontSize="24px" />
                </Box>
              </Link>
              <Link href="#">
                <Box
                  color="text.grey"
                  display="flex"
                  p="8px"
                  mt="8px"
                  cursor="pointer"
                  _hover={{ bg: "gray.50" }}
                  alignItems="center"
                >
                  <IoMdTime fontSize="32px" />
                  <Box ml="18px" mr="auto">
                    <Text mb="4px" color="text.black">
                      Create Investment Plan
                    </Text>
                    <Text fontSize="14px">Let your money work for you.</Text>
                  </Box>
                  <MdOutlineKeyboardArrowRight fontSize="24px" />
                </Box>
              </Link>
            </Box>
          </GridItem>
        </Grid>
      </Padding>
    </Box>
  );
};

export default YourPlans;
