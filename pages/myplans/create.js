import React, { useContext, useEffect, useState } from "react";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Goal, PlanResponsive } from "components/plans";
import { goalModalProps, goals } from "data";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdArrowForwardIos } from "react-icons/md";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import { Padding } from "components/layouts";
import {
  GoalsPlan,
  PremiumPlan,
  RealEstatePlan,
  SubmitGoal,
  SubmitPlan,
} from "components/plansModals";
import { GoalFormContext } from "providers/GoalFormProvider";
import { useGetAllPlans } from "api/plans";

const Create = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);
  const [goalProps, setGoalProps] = useState(goalModalProps.fixedIncome);
  const { goalFormState } = useContext(GoalFormContext);
  const { goalFormQuestions } = goalFormState;
  const [explorePlans, setExplorePlans] = useState([]);
  const [fetchErr, setFetchErr] = useState("");

  // const {
  //   isOpen: isPremiumOpen,
  //   onClose: onPremiumClose,
  //   onOpen: onPremiumOpen,
  // } = useDisclosure();
  // const {
  //   isOpen: isRealEstateOpen,
  //   onClose: onRealEstateClose,
  //   onOpen: onRealEstateOpen,
  // } = useDisclosure();

  const {
    isOpen: isGoalOpen,
    onClose: onGoalClose,
    onOpen: onGoalOpen,
  } = useDisclosure();

  const { data: plansData, error } = useGetAllPlans();
  useEffect(() => {
    setExplorePlans([]);
    if (plansData !== undefined) {
      if (plansData !== explorePlans) {
        const plans = plansData;
        setExplorePlans(plans);
      }
    }
  }, [plansData]);

  useEffect(() => {
    if (error !== undefined) setFetchErr(error);
  }, [error]);

  // const handlePlan = (name) => {
  //   if (name === "Premium Stocks") {
  //     onPremiumOpen();
  //   } else if (name === "Real Estate") {
  //     onRealEstateOpen();
  //   } else {
  //     setGoalProps(goalModalProps.fixedIncome);
  //     onGoalOpen();
  //   }
  // };

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

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.creatPlans,
    });
  }, []);
  return (
    <Box mt={["120", , , "80px"]}>
      <Padding>
        <Box py="64px">
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
                  key={plan.name}
                  style={{
                    cursor: "pointer",
                  }}
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
                <Text
                  mb="9px"
                  fontSize="20px"
                  color="text.black"
                  fontWeight="600"
                >
                  Goals
                </Text>
                <Text fontSize="14px" color="text.grey">
                  Tap on any type of the goals to create a new goal.
                </Text>
              </Box>

              <Box
                textAlign="center"
                display={["flex", , "none"]}
                color="text.black"
                alignItems="center"
                gap="8px"
              >
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
                <Goal
                  handleGoal={() => handleGoal(goal.action)}
                  key={goal.action}
                  goal={goal}
                />
              ))}
            </Flex>
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
                    <Goal
                      handleGoal={() => handleGoal(goal.action)}
                      key={goal.action}
                      goal={goal}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Box>
        </Box>
      </Padding>
      <GoalsPlan
        isOpen={isGoalOpen}
        onClose={onGoalClose}
        goalProps={goalProps}
      />
      <SubmitPlan />
      <SubmitGoal goalQuestions={goalFormQuestions} />
    </Box>
  );
};

export default Create;

Create.requireAuth = true;
