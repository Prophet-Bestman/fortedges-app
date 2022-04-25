import { Circle } from "@chakra-ui/react";
import React from "react";
import { BiTimeFive, BiErrorCircle } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";

const TransactionMark = ({ status }) => {
  return (
    <Circle
      size="40px"
      bg={
        status === "successful"
          ? "#4BD96433"
          : status === "declined"
          ? "red.100"
          : "#E9C46A33"
      }
    >
      {/* {!status && }
      {status  && } */}
      {status === "declined" ? (
        <BiErrorCircle color="red" />
      ) : status === "successful" ? (
        <AiOutlineCheck color="green" />
      ) : (
        <BiTimeFive color="#E6CF7D" />
      )}
    </Circle>
  );
};

export default TransactionMark;
