import { Box, Text } from "@chakra-ui/react";
import { Padding } from "components/layouts";
import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { newsList } from "data";
import { useGetRecentBlogs } from "api/blogs";

const News = () => {
  const [blogs, setBlogs] = useState([]);

  const { data: blogsData } = useGetRecentBlogs();

  useEffect(() => {
    if (!!blogsData && blogsData?.items.length > 0) setBlogs(blogsData?.items);
  }, blogsData);

  return (
    <Box mb="80px" maxW={["100vw", , , "80vw"]}>
      <Padding>
        <Text fontSize={["16px", "18px", "20px", "24px"]} mb="24px">
          News-get financial insight
        </Text>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            567: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
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
            paddingBottom: "160px",
            width: "full",
          }}
        >
          {!!blogs &&
            blogs?.length > 0 &&
            blogs?.slice(0, 4).map((news) => (
              <SwiperSlide key={news?.sys?.id}>
                <NewsCard news={news} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Padding>
    </Box>
  );
};

export default News;
