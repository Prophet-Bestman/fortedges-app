import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import configOptions from "./config";

const request = axios.create({
  baseURL: "https://fortedges-api.herokuapp.com/transactions",
});

const useDeposit = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post("", values, { headers: headers })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),
    {
      onSuccess: () => queryClient.invalidateQueries("user-transactions"),
    }
  );
};

const useSendPOP = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(`/${values.id}`, values.pop, { headers: headers })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),

    {
      onSuccess: () => queryClient.invalidateQueries("my-transactions"),
    }
  );
};

const useWithdraw = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(`/withdraw?code=${values.code}`, values.data, {
          headers: headers,
        })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),

    {
      onSuccess: () => queryClient.invalidateQueries("my-transactions"),
    }
  );
};
const useAdminWithdraw = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(`/admin-withdraw`, values, {
          headers: headers,
        })
        .then((res) => res)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),

    {
      onSuccess: () => queryClient.invalidateQueries("users"),
    }
  );
};

const useAdminDeposit = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post(`/add-deposit`, values, {
          headers: headers,
        })
        .then((res) => res)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),

    {
      onSuccess: () => queryClient.invalidateQueries("users"),
    }
  );
};

const useGetAllMyTransactions = (plan, page, limit) => {
  const headers = configOptions();
  return useQuery(["my-transactions", plan, page, limit], () =>
    request
      .get(`?plan=${plan || ""}&page=${page || 1}&limit=${limit || 10}`, {
        headers: headers,
      })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

const useConfirmTransaction = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(
          `/${values}/confirm`,
          {},
          {
            headers: headers,
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries("my-transactions"),
    }
  );
};

const useDeclineTransaction = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .put(
          `/${values}/decline`,
          {},
          {
            headers: headers,
          }
        )
        .then((res) => res.data),
    {
      onSuccess: () => queryClient.invalidateQueries("my-transactions"),
    }
  );
};

const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .delete(`/${values}`, {
          headers: headers,
        })
        .then((res) => res),
    {
      onSuccess: () => queryClient.invalidateQueries("my-transactions"),
    }
  );
};

export {
  useDeposit,
  useSendPOP,
  useGetAllMyTransactions,
  useWithdraw,
  useConfirmTransaction,
  useDeclineTransaction,
  useDeleteTransaction,
  useAdminWithdraw,
  useAdminDeposit,
};
