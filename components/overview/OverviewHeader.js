import { Box, Button, Flex, Grid, Text, useQuery } from "@chakra-ui/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AiOutlineEyeInvisible, AiOutlinePlus } from "react-icons/ai";
import OverviewCard from "./OverviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useGetUser } from "api/user";
import { config } from "utils";
import configOptions from "api/config";

const OverviewHeader = () => {
  const [user, setUser] = useState({});
  const [wallet, setWallet] = useState({});

  const { data: userData, error } = useGetUser();

  useEffect(() => {
    const localWallet = localStorage.getItem(config.key.wallet);
    if (localWallet != undefined) {
      const wallet = JSON.parse(localWallet);
      setWallet(wallet);
    }
  }, []);

  useEffect(() => {
    let user;
    if (userData != undefined) {
      setUser(userData);
      user = JSON.stringify(userData);
      localStorage.setItem(config.key.user, user);
    } else {
    }
  }, [userData]);

  React.useEffect(() => {
    if (error != undefined) {
    } else {
    }
  }, [error]);

  return (
    <Box
      pt="128px"
      bgGradient="linear-gradient(180deg, rgba(240, 178, 99, 0.2) 0%, rgba(196, 196, 196, 0) 100%)"
      pl={["24px", null, "32px", , "75px"]}
      pr={["24px", null, "32px", , "64px"]}
    >
      <Text fontStyle="13px" color="text.black">
        Good Afternoon {user.firstname} ☀️
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
            amount={wallet.balance ? wallet.balance : "$0.00"}
            gains={wallet?.gains ? wallet.gails : "0%"}
            title="Total Balance"
          />
        </SwiperSlide>
        <SwiperSlide>
          <OverviewCard
            amount={wallet.balance ? wallet.balance : "$0.00"}
            title="Total Invested"
          />
        </SwiperSlide>
        <SwiperSlide>
          <OverviewCard
            amount={wallet.balance ? wallet.balance : "$0.00"}
            gains={wallet?.gains ? wallet.gails : "0%"}
            title="Total Profit"
          />
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
