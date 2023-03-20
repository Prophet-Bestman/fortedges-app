import { Box, Grid, GridItem, Progress, Text } from "@chakra-ui/react";
import { Padding } from "components/layouts";
import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import UserPlan from "./UserPlan";
import { useAdminGetCustomPlans, useGetAllPlans } from "api/plans";
import UpgradePlanCard from "components/overview/UpgradePlanCard";
import { planFormActions, PlanFormContext } from "providers/PlanFormProvider";

const UserPlans = ({ userID, user }) => {
  const [userPlans, setUserPlans] = useState([]);
  const [higherPlans, setHigherPlans] = useState([]);
  const { dispatch: setPlanUser } = useContext(PlanFormContext);

  useEffect(() => {
    if (!!user) {
      setPlanUser({ type: planFormActions.SET_PLAN_USER, payload: user });
    }
  }, [user]);

  const { data: customPlansResp, isLoading: loadingCustom } =
    useAdminGetCustomPlans(userID);
  const { data: plansResp, isLoading } = useGetAllPlans();

  useEffect(() => {
    if (customPlansResp !== undefined) {
      if (Object.keys(customPlansResp).length > 0) {
        setUserPlans(customPlansResp.custom_plans);
      }
    }
  }, [customPlansResp]);

  //  const { data: customPlansResp, isLoading: loadingCustom } =
  //    useGetCustomPlans();

  useEffect(() => {
    if (plansResp?.length > 0 && customPlansResp?.custom_plans?.length > 0) {
      const currentPlanIdx = plansResp.findIndex(
        (plan) =>
          plan?.name?.toLowerCase() ===
          customPlansResp?.custom_plans[0]?.parent_plan_name?.toLowerCase()
      );
      const higherPlans = plansResp?.slice(currentPlanIdx + 1);
      setHigherPlans(higherPlans);
    }
  }, [plansResp, customPlansResp]);

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
                {isLoading ? (
                  <Progress isIndeterminate colorScheme="gray" />
                ) : (
                  !!userPlans &&
                  userPlans?.length > 0 &&
                  userPlans?.map((plan, i) => (
                    <SwiperSlide key={i}>
                      <UserPlan plan={plan} />
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </Box>
          </GridItem>
        </Grid>

        {userPlans?.length > 0 && (
          <Box my="64px">
            {higherPlans?.length > 0 && (
              <Box>
                <Text
                  borderBottomWidth="1px"
                  borderBottomColor="#E7E8ED"
                  fontSize="16px"
                  pb="4"
                >
                  You can earn more
                </Text>

                <Grid
                  templateColumns={[
                    "repeat(1, 1fr)",
                    ,
                    "repeat(3, 1fr)",
                    "repeat(2, 1fr)",
                    "repeat(3, 1fr)",
                  ]}
                  my="4"
                  gap="4"
                >
                  {isLoading || loadingCustom ? (
                    <Progress size="sm" isIndeterminate colorScheme="gray" />
                  ) : (
                    higherPlans?.length > 0 &&
                    higherPlans?.map((plan) => (
                      <UpgradePlanCard
                        key={plan?.id}
                        plan={plan}
                        customPlan={customPlansResp?.custom_plans[0]}
                      />
                    ))
                  )}
                </Grid>
              </Box>
            )}
          </Box>
        )}
      </Padding>
    </Box>
  );
};

export default UserPlans;
