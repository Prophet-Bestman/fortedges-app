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
      onSuccess: () => queryClient.invalidateQueries("uaer-transactions"),
    }
  );
};

export { useDeposit };
