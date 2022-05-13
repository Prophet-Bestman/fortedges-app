import React, { useContext, useEffect, useState } from "react";
import { Padding } from "components/layouts";
import {
  PlanBalance,
  PlanDetailsBanner,
  TransactionCol,
} from "components/plans";
import { Box, Grid, GridItem, Flex, Button } from "@chakra-ui/react";
import { useGetSingleCustomPlan } from "api/plans";
import { planActions, PlanContext } from "providers/PlanProvider";
import TransactionHistoryTable from "components/TransactionHistoryTable";
import { useGetAllMyTransactions } from "api/transactions";
import { MdOutlineArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const PlanComponents = ({ planID }) => {
  const { plan, dispatch: setPlan } = useContext(PlanContext);
  const [error, setError] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const {
    data: planData,
    error: planError,
    refetch,
  } = useGetSingleCustomPlan(planID);

  const { data: transData } = useGetAllMyTransactions(planID, page, 5);

  useEffect(() => {
    if (transData != undefined) {
      setTransactions(transData);
    }
  }, [transData]);

  useEffect(() => {
    if (plan !== undefined) {
      if (transactions?.total_documents >= 5) {
        setPages(Math.ceil(transactions?.total_documents / 5));
      } else setPages(1);
      refetch();
    }
  }, [plan, transactions]);

  useEffect(() => {
    if (!!planData) {
      if (!planData.isArray)
        setPlan({ type: planActions.SET_PLAN, payload: planData });
    }
  }, [planData]);

  useEffect(() => {
    if (planError !== undefined) {
      setError(planError);
    }
  }, [planError]);

  return (
    <Padding>
      <Grid
        mt={["180", , , "130px"]}
        templateColumns={["repeat(1, 1fr)", , , "repeat(12, 1fr)"]}
      >
        <GridItem
          colSpan={7}
          pr={[, , , "50px"]}
          borderRightColor="#F1F2F4"
          borderRightWidth={[0, , , "1px"]}
        >
          {!!plan && <PlanDetailsBanner />}
          {!!plan && <PlanBalance />}
          <Box display={["none", , , "block"]}>
            <TransactionHistoryTable transactions={transactions} />
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
          </Box>
        </GridItem>
        <GridItem pl={[, , , "18px"]} colSpan={5}>
          {!!plan && <TransactionCol />}
        </GridItem>
      </Grid>
    </Padding>
  );
};

export default PlanComponents;
