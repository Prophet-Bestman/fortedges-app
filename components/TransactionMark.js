import { Circle } from "@chakra-ui/react";
import React from "react";
import { BiTimeFive } from "react-icons/bi";

const TransactionMark = ({ status }) => {
  return (
    <Circle
      size="40px"
      bg={
        status === "pending"
          ? "#E6CF7D33"
          : status === "success"
          ? "#4BD96433"
          : ""
      }
    >
      {status === "pending" && <BiTimeFive color="#E6CF7D" />}
      {status === "success" && <BiTimeFive color="text.green" />}
    </Circle>
  );
};

export default TransactionMark;
