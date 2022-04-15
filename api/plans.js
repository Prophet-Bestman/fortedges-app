import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import configOptions from "./config";

const request = axios.create({
  baseURL: "https://fortedges-api.herokuapp.com",
});

const useGetAllPlans = () => {
  return useQuery("plans", () =>
    request
      .get("/plans")
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

const useGetCustomPlans = () => {
  const headers = configOptions();
  return useQuery("custom-plans", () =>
    request
      .get("/custom-plans", { headers: headers })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

const useGetSingleCustomPlan = (plan_id) => {
  const headers = configOptions();
  return useQuery(["custom-plans", plan_id], () =>
    request
      .get(`/custom-plans/${plan_id}`, { headers: headers })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 403) {
          localStorage.clear();
        } else return err;
      })
  );
};

const useCreateCustomPlan = () => {
  const queryClient = useQueryClient();
  const headers = configOptions();
  return useMutation(
    (values) =>
      request
        .post("/custom-plans", values, { headers: headers })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.clear();
          } else return err;
        }),
    {
      onSuccess: () => queryClient.invalidateQueries("custom-plans"),
    }
  );
};

export {
  useGetAllPlans,
  useCreateCustomPlan,
  useGetCustomPlans,
  useGetSingleCustomPlan,
};
