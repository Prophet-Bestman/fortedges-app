import { Circle } from "@chakra-ui/react";
import React from "react";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";

const TransactionMark = ({ status }) => {
  return (
    <Circle
      size="40px"
      bg={!status ? "#E6CF7D33" : !!status === "Success" ? "#4BD96433" : ""}
    >
      {!status && <BiTimeFive color="#E6CF7D" />}
      {!!status && <AiOutlineCheck color="text.green" />}
    </Circle>
  );
};

export default TransactionMark;
