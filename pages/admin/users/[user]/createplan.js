import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { goalModalProps, goals } from "data";
import React, { useState, useEffect, useContext } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Goal } from "components/plans";
import { PlanResponsive } from "components/plans";
import { MdArrowForwardIos } from "react-icons/md";
import Link from "next/link";
import { useGetAllPlans } from "api/plans";
import { config } from "utils";
import { Padding } from "components/layouts";
import { useRouter } from "next/router";

const CreatePlan = () => {
  const [explorePlans, setExplorePlans] = useState([]);
  const [fetchErr, setFetchErr] = useState("");
  const [userID, setUserID] = useState("");

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

  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    setUserID("");
  }, []);

  useEffect(() => {
    if (!!query) {
      setUserID(query.user);
    }
  }, [query]);
  return (
    <Padding>
      <Box py="164px">
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

        {explorePlans.length > 0 && (
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
                  onClick={() => {}}
                  key={plan._id}
                >
                  <PlanResponsive plan={plan} userID={userID} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        )}
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
              <Text
                mb="9px"
                fontSize="20px"
                color="text.black"
                fontWeight="600"
              >
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

          {/* ================================== */}
          {/* ================================== */}
          {/* LARGE SCREENS VIEW */}
          <Flex
            display={["none", , "flex"]}
            flexWrap="wrap"
            gap="10px"
            justify="center"
          >
            {goals.map((goal) => (
              <Goal userID={userID} key={goal.action} goal={goal} />
            ))}
          </Flex>

          {/* ================================== */}
          {/* ================================== */}
          {/* ============== MOBILE VIEW =========== */}
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
                display: "flex",
                justifyContent: "center",
              }}
            >
              {goals.map((goal) => (
                <SwiperSlide
                  style={{
                    cursor: "pointer",
                  }}
                  key={goal.name}
                >
                  <Goal userID={userID} key={goal.action} goal={goal} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      </Box>
    </Padding>
  );
};

export default CreatePlan;

CreatePlan.isAdmin = true;
