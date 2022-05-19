import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import { Padding } from "components/layouts";
import React, { useEffect, useState, useContext } from "react";
import OverviewPlan from "./OverviewPlan";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { IoMdTime } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";
import { useGetCustomPlans } from "api/plans";
import { AuthContext } from "providers/AuthProvider";

const YourPlans = ({ title }) => {
  const [plans, setPlans] = useState([]);
  const { user } = useContext(AuthContext);

  const { data: plansData } = useGetCustomPlans();

  useEffect(() => {
    if (plansData != undefined) setPlans(plansData.custom_plans);
  }, [plansData]);

  return (
    <Box my="64px">
      <Padding>
        <Grid
          templateColumns={["repeat(1, 1fr)", , , "repeat(3, 1fr)"]}
          gap="14px"
        >
          <GridItem
            colSpan={(!user?.is_verified || !plans?.length) > 0 ? 2 : 3}
            w="full"
          >
            <Text fontSize={["16px", "18px", "20px", "24px"]} mb="24px">
              {/* {title} */}
            </Text>
            <Box>
              {plans?.length > 0 && (
                <Flex mb="20px" justify="end">
                  <Link href="/myplans">
                    <Button size="sm" color={"app.primary"} variant="ghost">
                      See All
                    </Button>
                  </Link>
                </Flex>
              )}
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
                    slidesPerView:
                      !user?.is_verified && !plans?.length > 0 ? 4 : 5,
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
                {plans?.length > 0 &&
                  plans.slice(0, 4).map((plan) => (
                    <SwiperSlide key={plan._id}>
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
            {(!user?.is_verified || !plans?.length > 0) && (
              <>
                <Text
                  fontSize={["16px", "18px", "20px", "24px"]}
                  pb="24px"
                  borderBottomColor="#E2E0E0"
                  borderBottomWidth="1px"
                >
                  Setup Guide
                </Text>
                <Box>
                  {!user?.is_verified && (
                    <Link href="/settings ">
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
                          <Text fontSize="14px">
                            We need to know who you are.
                          </Text>
                        </Box>
                        <MdOutlineKeyboardArrowRight fontSize="24px" />
                      </Box>
                    </Link>
                  )}
                  {!plans?.length > 0 && (
                    <Link href="/myplans/create">
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
                          <Text fontSize="14px">
                            Let your money work for you.
                          </Text>
                        </Box>
                        <MdOutlineKeyboardArrowRight fontSize="24px" />
                      </Box>
                    </Link>
                  )}
                </Box>
              </>
            )}
          </GridItem>
        </Grid>
      </Padding>
    </Box>
  );
};

export default YourPlans;
