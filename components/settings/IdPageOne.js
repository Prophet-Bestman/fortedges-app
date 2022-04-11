import { Box, Circle, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";

const IdPageOne = ({ setIDPage, setTitle, onClose, setType }) => {
  const next = (title, type) => {
    setType(type);
    setTitle(title);
    setIDPage(2);
  };

  return (
    <Box>
      <Circle
        onClick={onClose}
        cursor="pointer"
        my="40px"
        size="40px"
        bg="#7950DA0D"
      >
        <AiOutlineArrowLeft />
      </Circle>
      <Circle mt="50px" mb="40px" size="100px" bg="#7950DA0D">
        <Image src="/img/ID_card.svg" />
      </Circle>

      <Box>
        <Text fontSize="18px">Which ID do you have</Text>

        <Box color="text.black" my="48px">
          <Flex
            alignItems="center"
            justify="space-between"
            pb="19px"
            my="16px"
            borderBottomWidth={"1px"}
            borderColor="#E0E1E4"
            cursor="pointer"
            onClick={() =>
              next("Upload Image of Driver's Licence", "drivers_licence")
            }
          >
            <Text>{"Driver’s licence"}</Text>
            <MdKeyboardArrowRight />
          </Flex>
          <Flex
            alignItems="center"
            justify="space-between"
            pb="19px"
            my="16px"
            borderBottomWidth={"1px"}
            borderColor="#E0E1E4"
            cursor="pointer"
            onClick={() => next("Upload Image of ID Card", "gov_issued_card")}
          >
            <Text>Government-issued ID Card </Text>
            <MdKeyboardArrowRight />
          </Flex>
          <Flex
            alignItems="center"
            justify="space-between"
            pb="19px"
            my="16px"
            borderBottomWidth={"1px"}
            borderColor="#E0E1E4"
            cursor="pointer"
            onClick={() =>
              next("Upload Image of International Passport", "passport")
            }
          >
            <Text>International Passport</Text>
            <MdKeyboardArrowRight />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default IdPageOne;
