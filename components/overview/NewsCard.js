import { Box, Text } from "@chakra-ui/react";
import Capsule from "components/Capsule";
import Link from "next/link";
import React from "react";

const NewsCard = ({ news, rounded }) => {
  const { fields } = news;
  const { title, slug, category, readTime, coverImage } = fields;

  return (
    <Link href={"/blogs/posts/" + slug}>
      <Box
        cursor="pointer"
        _hover={{ transform: "scale(1.02)" }}
        sx={{
          transitionDuration: "300ms",
        }}
        transition="all"
        transitionTimingFunction={"ease-in-out"}
      >
        <Box
          minH="180px"
          position="relative"
          borderRadius={"8px"}
          bgImg={coverImage?.fields?.file?.url}
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          mb="16px"
        ></Box>
        <Capsule>{category}</Capsule>

        <Text fontSize={["14px", , "16px"]} fontWeight="700" my="4px">
          {title}
        </Text>

        {/* <Capsule>{readTime} mins read</Capsule> */}
      </Box>
    </Link>
  );
};

export default NewsCard;
