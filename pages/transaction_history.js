import {
  Box,
  Button,
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
import {
  FilterModal,
  MiniTransaction,
  TransactionModal,
} from "components/plans";
import { useGetAllMyTransactions } from "api/transactions";
import { useGetCustomPlans } from "api/plans";
import { MdOutlineArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const TransactionHisory = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);
  const [transaction, setTransaction] = useState();
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [plan, setPlan] = useState("");
  const [plans, setPlans] = useState([]);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

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

  const { data: plansData } = useGetCustomPlans();

  useEffect(() => {
    if (plansData !== undefined) {
      setPlans(plansData);
    }
  }, [plansData, page]);

  const { data: transData, refetch } = useGetAllMyTransactions(
    limit,
    page,
    plan
  );

  useEffect(() => {
    if (transData != undefined) {
      setTransactions(transData);
    }
  }, [transData]);

  useEffect(() => {
    if (plan !== undefined) {
      if (transactions?.total_documents >= limit) {
        setPages(Math.ceil(transactions?.total_documents / limit));
      } else setPages(1);
      refetch();
    }
  }, [plan, limit, transactions]);

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
              _focus={{ ringColor: "none", borderColor: "app.primary" }}
              onClick={(e) => setType(e.target.value)}
            >
              <option value={""}>All</option>
              <option value="withdraw">Withdrwals</option>
              <option value="deposit">Deposit</option>
            </Select>
          </Box>

          {/* HIDE OTHER FILTERS ON MOBILE VIEW */}
          {/* <Box
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
          </Box> */}
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
              onChange={(e) => setStatus(e.target.value)}
            >
              {/* <option value="">All</option> */}
              <option value="incomplete">Incomplete</option>
              <option value="processing">Processing</option>
              <option value="successfull">Successfull</option>
              <option value="declined">Declined</option>
            </Select>
          </Box>
          <Box
            display={["none", , "block"]}
            w="full"
            maxW={["130px", , "185px"]}
          >
            <FormLabel color="text.grey" fontSize={["12px", , "14px"]}>
              Plan
            </FormLabel>
            {!!plans && (
              <Select
                fontSize={["14px", , "14px", "16px"]}
                h={["36px", , "42px"]}
                w="full"
                placeholder="All"
                _focus={{ ringColor: "none", borderColor: "app.primary" }}
                onChange={(e) => setPlan(e.target.value)}
              >
                <>
                  {plans.map((plan) => (
                    <option value={plan._id} key={plan._id}>
                      {plan.name}
                    </option>
                  ))}
                </>
              </Select>
            )}
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
            cursor="pointer"
          >
            {"Deposit Hasn’t arrived? Click here"}
          </Text>
        </Link>

        {/* TRANSACTION HISTORY ON DESKTOP */}
        <Box display={["none", , "block"]} my="48px">
          {transactions !== undefined && (
            <TransactionHistoryTable transactions={transactions} type={type} />
          )}
        </Box>

        {/* TRANSACTION HISTORY ON MOBILE */}
        {transactions !== undefined && transactions?.transactions?.length > 0 && (
          <Box display={["block", , "none"]} my="48px">
            {transactions?.transactions
              .filter((transaction) => {
                if (type === "") return transaction;
                return transaction.type == type;
              })
              ?.slice(0)
              ?.reverse()
              ?.map((transaction, i) => (
                <Box
                  key={i}
                  onClick={() => openTransactionModal(transaction)}
                  cursor="pointer"
                  // bg=
                  _hover={{
                    bg: "gray.100",
                  }}
                >
                  <MiniTransaction transaction={transaction} />
                </Box>
              ))}
          </Box>
        )}

        <Flex color="white" justifyContent="center" gap="12px" mb="48px">
          <Button
            size="sm"
            px="4px"
            py="12px"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
          >
            <MdOutlineArrowBackIos size="24px" />
          </Button>
          <Button
            size="sm"
            px="4px"
            py="12px"
            disabled={page === pages}
            onClick={() => setPage((prev) => prev + 1)}
          >
            <MdArrowForwardIos size="24px" color="white" />
          </Button>
        </Flex>
      </Padding>
      {!!transaction && (
        <TransactionModal
          isOpen={isTransactionOpen}
          onClose={onTransactionClose}
          transaction={transaction}
        />
      )}
      <FilterModal
        plans={plans}
        plan={plan}
        status={status}
        setStatus={setStatus}
        setPlan={setPlan}
        isOpen={isFilterOpen}
        onClose={onFilterClose}
      />
    </Box>
  );
};

export default TransactionHisory;

TransactionHisory.requireAuth = true;
