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
      request.post("", values, { headers: headers }).then((res) => res.data),
    // .catch((err) => err.response.status),
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
        .put(`/${values.id}`, values, { headers: headers })
        .then((res) => res.data),
    // .catch((err) => err.response.status),
    {
      onSuccess: () => queryClient.invalidateQueries("my-transactions"),
    }
  );
};

const useGetAllMyTransactions = (limit, page, plan) => {
  const headers = configOptions();
  return useQuery(["my-transactions", plan, page, limit], () =>
    request
      .get(`?plan=${plan}&limit=${limit}&page=${page}`, { headers: headers })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

export { useDeposit, useSendPOP, useGetAllMyTransactions };
