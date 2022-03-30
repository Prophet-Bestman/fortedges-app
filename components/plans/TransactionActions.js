import { Box, Button, Circle, Flex, useDisclosure } from "@chakra-ui/react";
import { FundPlan } from "components/plansModals";
import Withdraw from "components/plansModals/Withdraw";
import { options } from "data";
import React from "react";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";

const TransactionActions = () => {
  const [option, setOption] = React.useState(options.btc);
  const {
    isOpen: isFundOpen,
    onOpen: onFundOpen,
    onClose: onFundClose,
  } = useDisclosure();
  const {
    isOpen: isWithdrawOpen,
    onOpen: onWithdrawOpen,
    onClose: onWithdrawClose,
  } = useDisclosure();

  return (
    <Box borderBottomWidth="1px" borderColor="#F1F2F4" pb="24px">
      {/* Display on desktop */}
      <Flex
        display={["none", , "flex"]}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Button
            w="140px"
            h="48px"
            leftIcon={<AiOutlinePlus fontSize="20px" />}
            mr="8px"
            mb="8px"
            onClick={onFundOpen}
          >
            Fund Plan
          </Button>
          <Button
            variant="secondary"
            w="140px"
            h="48px"
            leftIcon={<AiOutlineMinus fontSize="20px" />}
            onClick={onWithdrawOpen}
          >
            Withdraw
          </Button>
        </Box>

        <Circle size="48px" bg="#F2F3F5">
          <BiDotsVerticalRounded fontSize="24px" />
        </Circle>
      </Flex>

      {/* Display on Mobile */}
      <Flex
        display={["flex", , "none"]}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Button
          rounded={"md"}
          size="sm"
          variant="secondary"
          leftIcon={<AiOutlinePlus fontSize="20px" />}
          onClick={onFundOpen}
        >
          Fund Plan
        </Button>
        <Button
          rounded={"md"}
          size="sm"
          variant="secondary"
          leftIcon={<AiOutlineMinus fontSize="20px" />}
          onClick={onWithdrawOpen}
        >
          Withdraw
        </Button>
      </Flex>
      <FundPlan isOpen={isFundOpen} onClose={onFundClose} />
      <Withdraw
        isOpen={isWithdrawOpen}
        onClose={onWithdrawClose}
        option={option}
        setOption={setOption}
      />
    </Box>
  );
};

export default TransactionActions;
