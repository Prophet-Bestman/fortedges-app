import {
  Box,
  Flex,
  FormLabel,
  InputGroup,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Padding } from "components/layouts";
import Link from "next/link";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect, useState } from "react";
import { TransactionHistoryTable } from "components";
import { FiFilter } from "react-icons/fi";
import { transactionHistory } from "data";
import {
  FilterModal,
  MiniTransaction,
  TransactionModal,
} from "components/plans";

const TransactionHisory = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);
  const [transaction, setTransaction] = useState();
  const {
    isOpen: isTransactionOpen,
    onOpen: onTransactionOpen,
    onClose: onTransactionClose,
  } = useDisclosure();
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onClose: onFilterClose,
  } = useDisclosure();

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.transactionHisory,
    });
  }, []);

  const openTransactionModal = (transaction) => {
    setTransaction(transaction);
    onTransactionOpen();
  };

  return (
    <Box mt={["160px", , , "130px"]}>
      <Padding>
        {/* ======  Filters ====== */}
        <Flex
          justifyContent={["space-between", , "start"]}
          my="24px"
          gap="24px"
          alignItems="center"
        >
          <Box w="full" maxW={["130px", , "185px"]}>
            <FormLabel color="text.grey" fontSize={["12px", , "14px"]}>
              Type
            </FormLabel>
            <Select
              fontSize={["14px", , "14px", "16px"]}
              h={["36px", , "42px"]}
              w="full"
              placeholder="Returns"
              _focus={{ ringColor: "none", borderColor: "app.primary" }}
            ></Select>
          </Box>

          {/* HIDE OTHER FILTERS ON MOBILE VIEW */}
          <Box
            display={["none", , "block"]}
            w="full"
            maxW={["130px", , "185px"]}
          >
            <FormLabel color="text.grey" fontSize={["12px", , "14px"]}>
              Time
            </FormLabel>
            <Select
              fontSize={["14px", , "14px", "16px"]}
              h={["36px", , "42px"]}
              w="full"
              placeholder="Past 30 days"
              _focus={{ ringColor: "none", borderColor: "app.primary" }}
            ></Select>
          </Box>
          <Box
            display={["none", , "block"]}
            w="full"
            maxW={["130px", , "185px"]}
          >
            <FormLabel color="text.grey" fontSize={["12px", , "14px"]}>
              Status
            </FormLabel>
            <Select
              fontSize={["14px", , "14px", "16px"]}
              h={["36px", , "42px"]}
              w="full"
              placeholder="Successful"
              _focus={{ ringColor: "none", borderColor: "app.primary" }}
            ></Select>
          </Box>
          <Box
            display={["none", , "block"]}
            w="full"
            maxW={["130px", , "185px"]}
          >
            <FormLabel color="text.grey" fontSize={["12px", , "14px"]}>
              Plan
            </FormLabel>
            <Select
              fontSize={["14px", , "14px", "16px"]}
              h={["36px", , "42px"]}
              w="full"
              placeholder="All"
              _focus={{ ringColor: "none", borderColor: "app.primary" }}
            ></Select>
          </Box>

          {/* SHOW OTHER FILTERS IN A MODAL FOR MOBILE */}
          <Box onClick={onFilterOpen} display={["block", , "none"]}>
            <FiFilter />
          </Box>
        </Flex>

        {/* Link */}
        <Link href="#">
          <Text
            fontSize={["14px", , "16px"]}
            color="app.primary"
            textDecor="underline"
          >
            {"Deposit Hasn’t arrived? Click here"}
          </Text>
        </Link>

        {/* TRANSACTION HISTORY ON DESKTOP */}
        <Box display={["none", , "block"]} my="48px">
          <TransactionHistoryTable />
        </Box>
        {/* TRANSACTION HISTORY ON DESKTOP */}
        <Box display={["block", , "none"]} my="48px">
          {transactionHistory.map((transaction, i) => (
            <Box key={i} onClick={() => openTransactionModal(transaction)}>
              <MiniTransaction transaction={transaction} />
            </Box>
          ))}
        </Box>
      </Padding>
      {!!transaction && (
        <TransactionModal
          isOpen={isTransactionOpen}
          onClose={onTransactionClose}
          transaction={transaction}
        />
      )}
      <FilterModal isOpen={isFilterOpen} onClose={onFilterClose} />
    </Box>
  );
};

export default TransactionHisory;

TransactionHisory.requireAuth = true;
