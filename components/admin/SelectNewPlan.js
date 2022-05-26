import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ConfirmModal from "components/ConfirmModal";
import { explorePlans, goalModalProps, goals, OverviewPlans } from "data";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ActionSuccessful from "./ActionSuccessful";
import AddBalance from "./AddBalance";
import AdminWithdraw from "./AdminWithdraw";
import PlanBox from "./PlanBox";
import AddBonus from "./AddBonus";
import { GoalsPlan, PremiumPlan, RealEstatePlan } from "components/plansModals";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { Goal, PlanResponsive } from "components/plans";
import { MdArrowForwardIos } from "react-icons/md";

const SelectNewPlan = ({ isOpen, onClose, action }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [goalProps, setGoalProps] = useState(goalModalProps.fixedIncome);

  const { isOpen: isActionOpen, onOpen: onActionOpen } = useDisclosure();
  const {
    isOpen: isConfirmOpen,
    onOpen: onConfirmOpen,
    onClose: onConfirmClose,
  } = useDisclosure();

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

  const {
    isOpen: isGoalOpen,
    onClose: onGoalClose,
    onOpen: onGoalOpen,
  } = useDisclosure();

  const next = () => {
    if (action === "CLEAR_BALANCE") {
      setTitle("Clear Balance");
      setText("Are you sure you want to clear this user's balance?");
      onConfirmOpen();
    } else if (action === "DELETE_PLAN") {
      setTitle("Delete Plan");
      setText("Are you sure you want to delete this user's plan?");
      onConfirmOpen();
    } else {
      setStep(2);
    }
  };

  const handlePlan = (name) => {
    if (name === "Premium Stocks") {
      onPremiumOpen();
    } else if (name === "Real Estate") {
      onRealEstateOpen();
    } else {
      setGoalProps(goalModalProps.fixedIncome);
      onGoalOpen();
    }
  };

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

  return (
    <Modal isOpen={isOpen} size="full">
      <ModalOverlay />
      {step === 1 && (
        <ModalContent maxW={"700px"}>
          <ModalHeader d="flex" alignItems="center">
            <Text textAlign="center" mx="auto">
              Select Plan
            </Text>

            <AiOutlineClose
              onClick={() => {
                setStep(1);
                onClose();
              }}
            />
          </ModalHeader>
          <ModalBody>
            <Box maxW={"100vw"}>
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
                {!!explorePlans &&
                  explorePlans?.length > 0 &&
                  explorePlans.map((plan) => (
                    <SwiperSlide
                      key={plan.name}
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={() => handlePlan(plan.name)}
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
                {goals?.length > 0 &&
                  goals.map((goal) => (
                    <Goal
                      handleGoal={() => handleGoal(goal.action)}
                      key={goal.action}
                      goal={goal}
                    />
                  ))}
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      )}

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={onConfirmClose}
        openModal={onActionOpen}
        text={text}
        title={title}
      />
      <ActionSuccessful isOpen={isActionOpen} />

      <PremiumPlan isOpen={isPremiumOpen} onClose={onPremiumClose} />
      <RealEstatePlan isOpen={isRealEstateOpen} onClose={onRealEstateClose} />
      <GoalsPlan
        isOpen={isGoalOpen}
        onClose={onGoalClose}
        goalProps={goalProps}
      />
    </Modal>
  );
};

export default SelectNewPlan;
