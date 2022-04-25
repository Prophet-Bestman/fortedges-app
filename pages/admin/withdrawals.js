import { Box } from "@chakra-ui/react";
import { useGetAllMyTransactions } from "api/transactions";
import { PendingWithdrawals, WithdrwalHistory } from "components/admin";
import { navActions, NavContext, navStates } from "providers/NavProvider";
import React, { useContext, useEffect, useState } from "react";

const Withdrawals = () => {
  const { dispatch: setActiveNav } = useContext(NavContext);
  const [transactions, setTransactions] = useState();
  const [withdrawals, setWithdrawals] = useState();
  const [pendingWithdrwals, setPendingWithdrwals] = useState();

  useEffect(() => {
    setActiveNav({
      type: navActions.SET_ACTIVE,
      payload: navStates.withdrawals,
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
      const withdrawals = transactions.filter(
        (transaction) => transaction.type === "withdrawal"
      );
      setWithdrawals(withdrawals);
    }
  }, [transactions]);

  useEffect(() => {
    if (withdrawals !== undefined && withdrawals.length > 0) {
      const pendingWithdrwals = withdrawals.filter(
        (withdrawal) => withdrawal.status === "processing"
      );
      setPendingWithdrwals(pendingWithdrwals);
    }
  }, [withdrawals]);

  return (
    <Box px="24px" py="40px">
      <PendingWithdrawals withdrawals={pendingWithdrwals} />
      <WithdrwalHistory withdrawals={withdrawals} />
    </Box>
  );
};

export default Withdrawals;

Withdrawals.isAdmin = true;
