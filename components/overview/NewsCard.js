import { Box, Image, Img, Text } from "@chakra-ui/react";
import Capsule from "components/Capsule";
import React from "react";

const NewsCard = ({ news }) => {
  const { title, photo, category } = news;
  return (
    <Box w="full" h="200px">
      <Image
        w="full"
        objectPosition={"top"}
        rounded="12px"
        mb="16px"
        h="full"
        objectFit="cover"
        src={photo}
      />
      <Capsule color="text.grey">{category}</Capsule>
      <Text color="text.black" mt="4px">
        {title}
      </Text>
    </Box>
  );
};

export default NewsCard;
