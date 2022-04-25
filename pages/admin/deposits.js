import { Box } from "@chakra-ui/react";
import { useGetAllMyTransactions } from "api/transactions";
import { DepositHistory, PendingDeposits } from "components/admin";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect, useState } from "react";

const Deposits = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);
  const [transactions, setTransactions] = useState();
  const [deposits, setDeposits] = useState();
  const [pendingDeposits, setPendingDeposits] = useState();

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.deposits,
    });
  }, []);

  const { data } = useGetAllMyTransactions("", "", 100000);
  useEffect(() => {
    if (data !== undefined && Object.keys(data).length > 0) {
      setTransactions(data.transactions);
    }
  }, [data]);

  useEffect(() => {
    if (transactions !== undefined && transactions.length > 0) {
      const deposits = transactions.filter(
        (transaction) => transaction.type === "deposit"
      );
      setDeposits(deposits);
    }
  }, [transactions]);

  useEffect(() => {
    if (deposits !== undefined && deposits.length > 0) {
      const pendingDeposits = deposits.filter(
        (deposit) => deposit.status === "processing"
      );
      setPendingDeposits(pendingDeposits);
    }
  }, [deposits]);

  return (
    <Box px="24px">
      <PendingDeposits deposits={pendingDeposits} />
      <DepositHistory deposits={deposits} />
    </Box>
  );
};

export default Deposits;

Deposits.isAdmin = true;
