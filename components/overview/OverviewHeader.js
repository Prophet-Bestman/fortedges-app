import { Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiOutlineEyeInvisible, AiOutlinePlus } from "react-icons/ai";
import OverviewCard from "./OverviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const OverviewHeader = () => {
  return (
    <Box
      pt="128px"
      bgGradient="linear-gradient(180deg, rgba(240, 178, 99, 0.2) 0%, rgba(196, 196, 196, 0) 100%)"
      pl={["24px", null, "32px", , "75px"]}
      pr={["24px", null, "32px", , "64px"]}
    >
      <Text fontStyle="13px" color="text.black">
        Good Afternoon Billy ☀️
      </Text>
      <Flex
        display={["none", , "flex"]}
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Flex gap="32px">
          <Text
            cursor={"pointer"}
            color="text.grey"
            display="flex"
            _hover={{ opacity: 0.7 }}
            alignItems="center"
            gap="10px"
          >
            <AiOutlineEyeInvisible />
            Hide Balance
          </Text>

          <Link href="#/">
            <Text
              cursor={"pointer"}
              _hover={{ opacity: 0.7 }}
              color="text.green"
              textDecor="underline"
            >
              Transaction History
            </Text>
          </Link>
        </Flex>

        <Button
          variant="secondary"
          bg="white"
          borderColor="gray.200"
          borderWidth="1px"
          leftIcon={<AiOutlinePlus />}
        >
          Add Money
        </Button>
      </Flex>

      <Swiper
        slidesPerView={1}
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
        <SwiperSlide>
          <OverviewCard
            amount={"$2000.93"}
            gains="14 %"
            title="Total Balance"
          />
        </SwiperSlide>
        <SwiperSlide>
          <OverviewCard amount={"$1800.00"} title="Total Invested" />
        </SwiperSlide>
        <SwiperSlide>
          <OverviewCard amount={"$200.93"} gains="14 %" title="Total Profit" />
        </SwiperSlide>
      </Swiper>

      <Button
        variant="secondary"
        w="full"
        color="app.primary"
        display={["block", , "none"]}
        bg="white"
        borderColor="gray.200"
        borderWidth="1px"
        leftIcon={<AiOutlinePlus />}
      >
        Add Money
      </Button>
    </Box>
  );
};

export default OverviewHeader;
